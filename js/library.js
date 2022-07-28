
// calling-functions

flashChangeContainers();

flashBackToTop();

// the-end-of-calling-functions



// flash-change-containers

function flashChangeContainers() {

	const changeContainers = (el) => {

		const buttons = el.querySelectorAll('.fl-change-containers-btn');
		const items = el.querySelectorAll('.fl-change-containers-item');

		// functions
		function show() {
			const index = this.getAttribute('data-index');
			for (let i = 0; i < items.length; i++) { i == index ? active(i) : deactive(i); }
		}

		const active = (i) => { items[i].classList.add('fl-show'); buttons[i].classList.add('fl-active'); }

		const deactive = (i) => { items[i].classList.remove('fl-show'); buttons[i].classList.remove('fl-active'); }

		// adding-functions
		for (let i = 0; i < buttons.length; i++) { 
			buttons[i].addEventListener('click', show);
			buttons[i].setAttribute('data-index', i); 
		}

	}

	// adding-function
	const elements = document.querySelectorAll('.fl-change-containers');
	for (let i = 0; i < elements.length; i++) { changeContainers(elements[i]); }

}

// the-end-of-flash-change-containers



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