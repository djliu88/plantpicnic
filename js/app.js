const sections = document.querySelectorAll('section');
const navbar = document.getElementById('navbar');

/** 
* @description Build the navigation menu
*/
sections.forEach((section) => {
	const listItem = document.createElement('li');
	const listName = section.id.slice(0, -1);
	const listNumber = section.id.slice(7);
	listItem.innerHTML = `<a href="#${section.id}">${listName} ${listNumber}</a>`;
	navbar.querySelector('ul').appendChild(listItem);
});

/** 
* @description Smooth scrolling for navigation links
*/
navbar.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href').substring(1);
		const targetSection = document.getElementById(targetId);
		targetSection.scrollIntoView({ behavior: 'smooth' });
	});
});

/** 
* @description Highlight the active section in the navbar
*/
function makeActive() {
   for (const section of sections) {
	   const box = section.getBoundingClientRect();
	   const activeLink = navbar.querySelector(`a[href="#${section.id}"]`);

	   if (box.top <= 150 && box. bottom >= 150) {
		   activeLink.classList.add('active');
	   } else {
		   activeLink.classList.remove('active');
	   };
   };
};

/** 
* @description Hide navbar when scrolling
*/
let scrollTimeout;

function hideNavbar() {
    navbar.style.transform = 'translateY(-150%)';
}

function showNavbar() {
    navbar.style.transform = 'translateY(0)';
}

function handleScroll() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }

    showNavbar();

    // Set a timeout to hide the navigation bar after 2 seconds
    scrollTimeout = setTimeout(() => {
        hideNavbar();
    }, 2000);
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial check on page load
handleScroll();

// Attach the scroll event listener
document.addEventListener('scroll', function() {
	makeActive();
	handleScroll();
});