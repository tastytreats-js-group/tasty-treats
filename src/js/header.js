const mobilMenu = document.querySelector('.mobil-menu');
const exitBtn = document.querySelector('.exit-icon-wrapper');
const menutBtn = document.querySelector('.menu-icon-wrapper');

menutBtn.addEventListener('click', () => {
  mobilMenu.classList.toggle('menu-active');
});

exitBtn.addEventListener('click', () => {
  mobilMenu.classList.remove('menu-active');
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    mobilMenu.classList.remove('menu-active');
  }
});


const body = document.querySelector('body');

const mobileToggle = document.querySelector('.mobile-toggle-switch');
const desktopToggle = document.querySelector('.desktop-toggle-switch'); 

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    if (savedTheme === 'dark') {
 body.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
    }
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      body.setAttribute('data-theme', 'dark');
    }
  }
 
function toggleTheme() {
  const isDark = body.getAttribute('data-theme') === 'dark';

  if (isDark) {

    body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}
//
mobileToggle?.addEventListener('click', toggleTheme);
desktopToggle?.addEventListener('click', toggleTheme);


window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        body.setAttribute('data-theme', 'dark');
      } else {
        body.removeAttribute('data-theme');
      }
    }
  });