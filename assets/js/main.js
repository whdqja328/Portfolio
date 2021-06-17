'use strict';

// 스크롤시 nav메뉴 변경
const navbar = document.querySelector('#nav');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {

    if (window.scrollY > navbarHeight) {
        navbar.classList.add('nav_dark')
    } else {
        navbar.classList.remove('nav_dark')
    }

});

// nav 버튼 클릭시 해당 섹션 이동
const navMenu = document.querySelector('.nav_menu');
navMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if (link == null) {
        return;
    }
    scrollIntoView(link)
});

// contact 섹션 이동
const homeContactBtn = document.querySelector('.home_contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('contact');
});

// 스크롤시 home 섹션 투명도 조정
const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 최상단 이동 이벤트
const scrollTopBtn = document.querySelector('.scrolltop');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        scrollTopBtn.classList.add('on')
    } else {
        scrollTopBtn.classList.remove('on')
    }
});

scrollTopBtn.addEventListener('click', () => {
    scrollIntoView('home');
})

// Project 탭 메뉴
const workBtnContainer = document.querySelector('.work_categories');
const projectContainer = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }
    projectContainer.classList.add('animate')

    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('on')
            } else {
                project.classList.add('on')
            }
        });
        projectContainer.classList.remove('animate')
    }, 300);
});







//  부드러운 스크롤 함수
const scrollIntoView = (sel) => {
    const scrollTo = document.getElementById(sel);
    scrollTo.scrollIntoView({
        behavior: "smooth"
    });
}