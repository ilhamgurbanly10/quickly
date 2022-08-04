
// calling-functions

flashBackToTop();

flashLightbox();

flashBlinkingCircles();

navbarFromTop();

scrollAnimation();

flashChangeContainers();

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



// flash-lightbox

function flashLightbox() {

	const lightbox = (el) => {

		const images = el.querySelectorAll('.fl-lightbox-img');
		const buttons = el.querySelectorAll('.fl-lightbox-btn');
		const len = images.length;
		var modal, slides = [], numbers = [], slideImages = [], prevArrow, nextArrow, nextIndex = 1, 
		lastIndex = len - 1, prevIndex = lastIndex, closeBtn, playBtn, pauseBtn, playing, isPlaying = false;

		// functions
		const createModal = () => {

			modal =  flashCreateElement("DIV","", { class: "fl-lightbox-modal", }, document.body);
			prevArrow = flashCreateElement("button","<i class='fa fa-chevron-left'></i>", { class: "fl-lightbox-arrow fl-lightbox-prev", type: "button"}, modal);
			nextArrow = flashCreateElement("button","<i class='fa fa-chevron-right'></i>", { class: "fl-lightbox-arrow fl-lightbox-next", type: "button"}, modal);
			closeBtn = flashCreateElement("button","<i class='fa fa-times'></i>", { class: "fl-lightbox-close fl-lightbox-modal-btn", type: "button"}, modal);
			buttonList =  flashCreateElement("div","", { class: "fl-lightbox-btn-list", }, modal);
			playBtn = flashCreateElement("button","<i class='fa fa-play'></i>", { class: "fl-lightbox-play fl-lightbox-modal-btn", type: "button"}, buttonList);
			pauseBtn = flashCreateElement("button","<i class='fa fa-pause'></i>", { class: "fl-lightbox-pause fl-lightbox-modal-btn", type: "button", disabled: ""}, buttonList);


			for (let i = 0; i < len; i++) {
				slides[i] = flashCreateElement("DIV","", { class: "fl-lightbox-slide", }, modal);
				numbers[i] = flashCreateElement("DIV",""+Number(i + 1)+" / "+len+"", { class: "fl-lightbox-number", }, slides[i]);
				slideImages[i] = document.importNode(images[i], true);
				slideImages[i].className = "fl-lightbox-img";
				slides[i].appendChild(slideImages[i]);
				buttons[i].setAttribute('data-index', i);
				buttons[i].addEventListener('click', showModal);
			}

			slides[0].classList.add('fl-show');

			nextArrow.addEventListener('click', next);
			prevArrow.addEventListener('click', prev);
			nextArrow.addEventListener('click', pausePlay);
			prevArrow.addEventListener('click', pausePlay);
			closeBtn.addEventListener('click', closeModal);
			playBtn.addEventListener('click', play);
			pauseBtn.addEventListener('click', pause);

		}

		const setNextIndex = () => { 
			nextIndex == 0 ? prevIndex = lastIndex : prevIndex = nextIndex - 1 ;
			nextIndex == lastIndex ? nextIndex = 0 : nextIndex++; 
		}

		const setPrevIndex = () => { 
			prevIndex == lastIndex ? nextIndex = 0 : nextIndex = prevIndex + 1; 
			prevIndex == 0 ? prevIndex = lastIndex : prevIndex--; 
		}

		const next = () => {
			for (let i = 0; i < len; i++) { i == nextIndex ? slides[i].classList.add('fl-show') : slides[i].classList.remove('fl-show') }
			setNextIndex();
		}

		const prev = () => {
			for (let i = 0; i < len; i++) { i == prevIndex ? slides[i].classList.add('fl-show') : slides[i].classList.remove('fl-show') }
			setPrevIndex();
		}

		function showModal() {
			const dataIndex = this.getAttribute('data-index'); 
			modal.classList.add('fl-show');
			for (let i = 0; i < len; i++) { i == dataIndex ? slides[i].classList.add('fl-show') : slides[i].classList.remove('fl-show') }
			nextIndex  = dataIndex;
			setNextIndex();
		}

		const closeModal = () => { modal.classList.remove('fl-show'); pause(); } 

		const play = () => { playing = setInterval(function() { next()}, 6000); disablePlay(); enablePause(); isPlaying = true; }

		const pause = () => { clearInterval(playing);  enablePlay(); disablePause(); isPlaying = false; }

		const enablePlay = () => playBtn.removeAttribute('disabled');

		const enablePause = () => pauseBtn.removeAttribute('disabled');

		const disablePlay = () => playBtn.setAttribute('disabled', '');

		const disablePause = () => pauseBtn.setAttribute('disabled', '');


		const pausePlay = () => { if (isPlaying) { pause(); play(); } }

		// calling-functions
		createModal();
		
	}

	const elements = document.querySelectorAll('.fl-lightbox');
	elements.forEach(el => lightbox(el));

}

// the-end-of-flash-lightbox



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



// navbar-from-top

function navbarFromTop() {

	// elements-and-values
	const navbar = document.querySelector('.navbar');

	// funtions
	const animate = () => {
		navbar.classList.add('navbar-hide');
		setTimeout(function() {
			navbar.classList.add('navbar-from-top');
		}, 10);
	}

	const defaultCase = () => {
		navbar.classList.remove('navbar-hide');
		navbar.classList.remove('navbar-from-top');		
	}	

	const check = () => document.documentElement.scrollTop > 2 ? animate() : defaultCase();

	// adding-events
	window.addEventListener('scroll', check);
	window.addEventListener('load', check);

}

// the-end-of-navbar-from-top



// slider

$('.slider').slick({
  dots: true,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 300,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 575.98,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 991.98,
      settings: {
        slidesToShow: 2,
      }
    }
  ]  
});

// the-end-of-slider



// slider-2

$('.slider-2').slick({
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 300,
  arrows: true,
});

// the-end-of-slider-2



// flash-blinking-circles

var blinkingCirlces;

function flashBlinkingCircles() {

	const par = document.querySelector('.fl-loading-ani-blinking-circles');
	const order = par.getAttribute('order');
	const elements = par.querySelectorAll('.fl-loading-ani-blinking-circle');
	var x = 0;
	if (order != "true") return;

	// functions
	const show = (el) => el.classList.add('fl-show');

	const hide = (el) => { 

		for (let i = 0; i < elements.length; i++) {	
			if (elements[i] === el) continue; 
			elements[i].classList.remove('fl-show');
		}

	}

	// calling-functions
	blinkingCirlces = setInterval( 
		function() { show(elements[x]); hide(elements[x]); x == 2 ? x = 0 : x++; },
	1000);

}

function flashStopBlinkingCircles() { clearInterval(blinkingCirlces); }

// the-end-of-flash-blinking-circles



// scroll-animation

function scrollAnimation() {

	const elements = document.querySelectorAll('.scroll-animation');
	for (let i = 0; i < elements.length; i++) { flashIsScrolled(elements[i]); }

}

// the-end-of-scroll-animation



// flash-is-scrolled

function flashIsScrolled(el) {

	function addClass() {

		if (isInView(el)) {

			el.classList.add('fl-is-scrolled');
			window.removeEventListener('scroll', addClass);

		}	

	}	
	
	function isInView(el, percentageScroll = 100) {

	  const elementTop = el.getBoundingClientRect().top;

	  return (
	    elementTop <= 
	    ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
	  );

	}

	window.addEventListener('load', addClass);
	window.addEventListener('scroll', addClass);

}	

// the-end-of-flash-is-scrolled