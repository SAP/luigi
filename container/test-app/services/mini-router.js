const defaultRoute = 'dashboard';

function activateRoute() {
  const route =
    window.location.hash?.length > 0 && window.location.hash !== '#/'
      ? window.location.hash.substring(1)
      : defaultRoute;
  console.log('route:', route);

  // navigation state
  const navCnt = document.querySelector('[top-navigation]');
  navCnt.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href') === '#' + route) {
      a.classList.add('bg-gray-900', 'text-white');
      a.classList.remove('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
    } else {
      a.classList.remove('bg-gray-900', 'text-white');
      a.classList.add('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
    }
  });

  document
    .querySelector('#mobile-menu')
    .querySelectorAll('a')
    .forEach(a => {
      if (a.getAttribute('href') === '#' + route) {
        a.classList.add('bg-gray-900', 'text-white');
        a.classList.remove('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
      } else {
        a.classList.remove('bg-gray-900', 'text-white');
        a.classList.add('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
      }
    });

  // outlets
  const outlets = document.querySelectorAll('[route]');
  outlets.forEach(el => {
    el.style.display = 'none';
  });
  const activeOutlet = document.querySelector(`[route=${route}]`);
  if (activeOutlet) {
    activeOutlet.style.display = 'unset';
    activeOutlet.querySelector('luigi-container')?.init();
    activeOutlet.querySelector('luigi-compound-container')?.init();
  }
}

window.onclick = () => {
  document.querySelector('#mobile-menu').classList.toggle('hidden', true);
};

window.addEventListener('hashchange', event => {
  activateRoute();
});

window.onload = () => {
  activateRoute();
};
