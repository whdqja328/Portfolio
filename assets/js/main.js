'use strict';

// nav 메뉴 스크롤시 투명하게
const navbar = document.querySelector('#nav');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
    console.log(window.scrollY)
    console.log(navbarHeight)

    if(window.scrollY > navbarHeight){
        navbar.classList.add('nav_dark')
    }else {
        navbar.classList.remove('nav_dark')
    }
});