
// calling-functions

flashBackToTop();

switchModals();

// the-end-of-calling-functions


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
  dots: false,
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

