
// onloading

document.body.onload = function() {
	endProgress();
	flashStopBlinkingCircles();
}

// the-end-of-onloading



// calling-functions

navbarForm();


// the-end-of-calling-functions



// progress

function endProgress() { document.querySelector('.fl-progress').classList.add('fl-progress-is-ended'); }

// the-end-of-progress



// navbar-form

function navbarForm() {

	const form = document.querySelector('.fl-navbar-form');
	const btn = document.querySelector('.fl-navbar-form-toggler');

	if (!form || !btn) return;
	const icon = btn.querySelector('.fa');

	const toggle = () => { 

		form.classList.toggle('fl-show'); 
		btn.classList.toggle('fl-active'); 
		if (icon) { icon.classList.toggle('fa-times'); icon.classList.toggle('fa-search'); }

	}

	btn.addEventListener('click', toggle);

}

// the-end-of-navbar-form



// flash-create-element

function flashCreateElement(tagName, html = "", attributes = {}, parent = false, childIndex = "last-child") {

	var el = document.createElement(''+tagName+'');
	el.innerHTML = html;

	for (x in attributes) {	el.setAttribute(''+x+'',''+attributes[x]+''); }

  	if (parent) {

  		if (childIndex == "last-child") parent.appendChild(el);
  		else if (childIndex == "first-child") parent.insertBefore(el, parent.childNodes[0]);
 		else parent.insertBefore(el, parent.children[childIndex]);
  	}

  	return el;

}

// the-end-of-flash-create-element


