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
    navMenu.classList.remove('on');
    scrollIntoView(link)
});

// nav toggle 버튼
const navToggleBtn = document.querySelector('.nav_toggle_btn');
navToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('on')
});

// contact 섹션 이동
const homeContactBtn = document.querySelector('.home_contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
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
    scrollIntoView('#home');
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

    // 해당 페이지 클래스 추가
    const active = document.querySelector('.category_btn.active');
    if(active != null){
        active.classList.remove('active')
    }
    e.target.classList.add('active')

    projectContainer.classList.add('animate')
    setTimeout(() => {
        projects.forEach(project => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('on')
            } else {
                project.classList.add('on')
            }
        });
        projectContainer.classList.remove('animate')
    }, 300);
});

// 스크롤 smooth 함수
function scrollIntoView (sel) {
    const scrollTo = document.querySelector(sel);
    scrollTo.scrollIntoView({
        behavior: "smooth"
    });
}

// IntersectionObserver API
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#contact',
  ];
  
  const sections = sectionIds.map(id => document.querySelector(id));
  const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
  
  let selectedNavIndex = 0;
  let selectedNavItem = navItems[0];
  function selectNavItem(selected) {
    selectedNavItem.classList.remove('on');
    selectedNavItem = selected;
    selectedNavItem.classList.add('on');
  };
  
  function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
  };
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting && entry.intersectionRatio > 0) {
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        // 스크롤링이 아래로 되어서 페이지가 올라옴
        if(entry.boundingClientRect.y < 0) {
          selectedNavIndex = index +1;
        } else {
          selectedNavIndex = index -1;
        }
      };
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
  
  window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
      selectedNavIndex = 0;
    } else if (
      Math.round(window.scrollY + window.innerHeight) >=
      document.body.clientHeight
    ) {
      selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
  });

