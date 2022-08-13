
// calling-functions

flashBackToTop();

switchModals();

flashForm();

// the-end-of-calling-functions



// flash-form

flashForm();

function flashForm() {

  const forms = document.querySelectorAll('.fl-form');

  for (let i = 0; i < forms.length; i++) { 

    flashFormCheck(forms[i]);

  }

}

// flash-form-check
function flashFormCheck(form) {

  const fields = form.querySelectorAll('.fl-form-required');
  const limitedFields = form.querySelectorAll('.fl-form-limit');
  const fileFields = form.querySelectorAll('.fl-form-required-file');
  const len = fields.length;
  const submit = form.querySelector('.fl-form-submit');
  const email = form.querySelector('.fl-form-email');
  const emailMes = form.querySelector('.fl-form-email-message');
  const messages = form.querySelectorAll('.fl-form-error-message');
  var isValid = false;

  if (!fields[0]) return;

  // functions
  // -requirement-
  function checkOnFocusOut() {
    const message = this.closest('.fl-form-container').querySelector('.fl-form-required-message');
    this.value == "" ? requiredMessage(this, message) : removeRequiredMessage(this, message); 
    validation() ? disableSubmit() : enableSubmit();
    this.addEventListener('keyup', check);
    this.removeEventListener('focusout', checkOnFocusOut);
  }

  function check() {
    const message = this.closest('.fl-form-container').querySelector('.fl-form-required-message');
    this.value == "" ? requiredMessage(this, message) : removeRequiredMessage(this, message); 
    validation() ? disableSubmit() : enableSubmit();
  }


  function checkFile() {
    alert("Hi");
    const message = this.closest('.fl-form-container').querySelector('.fl-form-required-message');
    this.files.length < 1 ? requiredMessage(this, message) : removeRequiredMessage(this, message); 
    validation() ? disableSubmit() : enableSubmit();
  }

  const requiredMessage = (input, message) => {
    input.classList.add('fl-form-required-error'); 
    if (message) message.classList.add('fl-show');
  }

  const removeRequiredMessage = (input, message) => {
    input.classList.remove('fl-form-required-error'); 
    if (message) message.classList.remove('fl-show');
  }

  // -character-limit-
  function checkLimitOnFocusOut() {

    const message = this.closest('.fl-form-container').querySelector('.fl-form-limit-message');
    const min = this.getAttribute('fl-form-min');
    const max = this.getAttribute('fl-form-max');
    const len = this.value.trim().length;
    len > 0 & len < min || len > max ? 
    limitMessage(this, message) : removeLimitMessage(this, message); 
    validation() ? disableSubmit() : enableSubmit();
    this.addEventListener('keyup', checkLimit);
    this.removeEventListener('focusout', checkLimitOnFocusOut);
  }

  function checkLimit() {

    const message = this.closest('.fl-form-container').querySelector('.fl-form-limit-message');
    const min = this.getAttribute('fl-form-min');
    const max = this.getAttribute('fl-form-max');
    const len = this.value.trim().length;
    len > 0 & len < min || len > max ? 
    limitMessage(this, message) : removeLimitMessage(this, message); 
    validation() ? disableSubmit() : enableSubmit();

  }

  const limitMessage = (input, message) => {
    input.classList.add('fl-form-limit-error'); 
    if (message) message.classList.add('fl-show');
  }

  const removeLimitMessage = (input, message) => {
    input.classList.remove('fl-form-limit-error'); 
    if (message) message.classList.remove('fl-show');
  }

  // -submit-
  const enableSubmit = () => submit.removeAttribute('disabled');

  const disableSubmit = () => submit.setAttribute('disabled', '');

  const toggleSubmit = () => isValid ? enableSubmit() : disableSubmit();

  const validation = () => {

    var countErrors = 0;

    for (let i = 0; i < fields.length; i++) { 
      if (fields[i].className.includes('error')) countErrors++;	
    }

    countErrors === 0 ? isValid = false : isValid = true;
    return isValid;

  }

  // -email-
  function emailOnFocusOut() {
    !flashIsEmail(this.value) & this.value != "" ? emailMessage() : removeEmailMessage(); 
    validation() ? disableSubmit() : enableSubmit();
    email.addEventListener('keyup', emailValidation);
    email.removeEventListener('focusout', emailOnFocusOut);
  } 

  function emailValidation() {
    !flashIsEmail(this.value) & this.value != "" ? emailMessage() : removeEmailMessage(); 
    validation() ? disableSubmit() : enableSubmit();
  } 

  const emailMessage = () => {
    email.classList.add('fl-form-email-error'); 
    if (emailMes) emailMes.classList.add('fl-show');
  }

  const removeEmailMessage = () => {
    email.classList.remove('fl-form-email-error'); 
    if (emailMes) emailMes.classList.remove('fl-show');
  }

  // -others-
  const checkAll = (e) => {

    for (let i = 0; i < len; i++) {

      if (fields[i].value == "") { 
        e.preventDefault();
        let mes = fields[i].closest('.fl-form-container').querySelector('.fl-form-required-message');
        requiredMessage(fields[i], mes); 
        disableSubmit();
      }
        
    }

    for (let i = 0; i < fileFields.length; i++) {

      if (fileFields[i].files.length < 1) { 
        e.preventDefault();
        let mes = fileFields[i].closest('.fl-form-container').querySelector('.fl-form-required-message');
        requiredMessage(fileFields[i], mes); 
        disableSubmit();
      }
        
    }

    startChecking();

  }

  const startChecking = () => {

    for (let i = 0; i < len; i++) { fields[i].addEventListener('keyup', check); }

    for (let i = 0; i < limitedFields.length; i++) { 
      limitedFields[i].addEventListener('keyup', checkLimit);  
    }		

    if (email) email.addEventListener('keyup', emailValidation);

  }

  const resetAll = () => {

    if (email) { 
      email.classList.remove('fl-form-required-error');
      email.classList.remove('fl-form-email-error');
    }

    for (let i = 0; i < messages.length; i++) { messages[i].classList.remove('fl-show'); }

    for (let i = 0; i < len; i++) { fields[i].classList.remove('fl-form-required-error');}

    for (let i = 0; i < limitedFields.length; i++) { 
      limitedFields[i].classList.remove('fl-form-limit-error');
    }

    enableSubmit();
    addEvents();

  }

  const addEvents = () => {

    for (let i = 0; i < len; i++) { 
      fields[i].addEventListener('focusout', checkOnFocusOut); 
    }

    for (let i = 0; i < limitedFields.length; i++) { 
      limitedFields[i].addEventListener('focusout', checkLimitOnFocusOut); 
    }

    for (let i = 0; i < fileFields.length; i++) { 
      fileFields[i].addEventListener('change', checkFile); 
    }

    if (email) email.addEventListener('focusout', emailOnFocusOut);

  }

  // adding-functions
  addEvents();	

  form.addEventListener('submit', checkAll);
  form.addEventListener('reset', resetAll);

}

function flashIsEmail(val) {

  const reg = new RegExp('^([a-zA-Z0-9-._]+)'+
                   '(@)([a-zA-Z0-9-.]+)'+
                   '(.)([a-zA-Z]{2,4})$');
  
  return reg.test(val);

}

// the-end-of-flash-form



// switch-modals

function switchModals() {

    function switchToLogIn() {

        const loginBtn = document.querySelector('.log-in-btn');
        const close = document.querySelector('.sign-up-close');
        const switchBtn = document.querySelector('.switch-to-login');

        if (!loginBtn) return;

        const switchTo = () => {  
            close.click(); 
            setTimeout(function() { loginBtn.click(); }, 500);   
        }

        switchBtn.addEventListener('click', switchTo);

    }

    function switchToSignUp() {

      const signUpBtn = document.querySelector('.sign-up-btn');
      const close = document.querySelector('.log-in-close');
      const switchBtn = document.querySelector('.switch-to-sign-up');

      if (!signUpBtn) return;

      const switchTo = () => { 
          close.click(); 
          setTimeout(function() { signUpBtn.click(); }, 500); 
      }

      switchBtn.addEventListener('click', switchTo);

  }

    switchToLogIn();
    switchToSignUp();

}

// switch-modals

// slider

$('.slider').slick({
  dots: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 300,
  arrows: false,
  responsive: [
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      }
    }
  ]  
});

// the-end-of-slider



// flash-back-to-top-button

function flashBackToTop() {

	// elements-and-values
	const btn = document.querySelector('.fl-back-to-top-btn');

	// avodiding-errors
	if (btn == undefined) return;

	// functions
	function show() { 

		if (document.documentElement.scrollTop > 700) btn.classList.add('fl-show');

		else hide();

	}

	function hide() { btn.classList.remove('fl-show'); }

	function toTop() { document.documentElement.scrollTop = 0; }

	// adding-functions
	btn.addEventListener('click', hide);
	btn.addEventListener('click', toTop);
	window.addEventListener('scroll', show);
	window.addEventListener('load', show);

}

// the-end-of-flash-back-to-top-button

