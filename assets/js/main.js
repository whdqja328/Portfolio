'use strict';

// nav 메뉴 스크롤시 투명하게
const navbar = document.querySelector('#nav');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {

    if (window.scrollY > navbarHeight) {
        navbar.classList.add('nav_dark')
    } else {
        navbar.classList.remove('nav_dark')
    }

});

const navMenu = document.querySelector('.nav_menu');

navMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if (link == null) {
        return;
    }
    console.log(event.target.dataset.link)

    scrollIntoView(link)
});

const homeContactBtn = document.querySelector('.home_contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact')
});

const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    home.style.opacity = 1 - window.scrollY / homeHeight;
});








const scrollIntoView = (sel) => {
    const scrollTo = document.getElementById(sel);
    scrollTo.scrollIntoView({
        behavior: "smooth"
    });
}