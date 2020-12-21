import './style.scss';
// import {Scroll} from './scroll.js';

(() => {

  const root = document.querySelectorAll('.wrap');


  root.forEach((item) => {
    const scroll = item.querySelector('.scroll');
    const scrollHandle = item.querySelector('.scroll__handler');
    const scrollContent = item.querySelector('.wrap__content');

    const initScrollBar = () => {
      const ratio = scrollContent.clientHeight / scrollContent.scrollHeight;

      if ( ratio === 1 ) {
        scroll.style.display = 'none';
      } else {
        scroll.style.display = '';
        scrollHandle.style.height = `${ratio * 100}%`;
      };

      scrollContent.addEventListener('scroll', () => {
        const scrollRatio = scrollContent.scrollTop / scrollContent.scrollHeight * 100;
        scrollHandle.style.transform = `translate3d(0, ${scroll.clientHeight / 100 * scrollRatio}px, 0)`;
      });

    };

    initScrollBar();
    window.addEventListener('resize', initScrollBar);

    const config = { attributes: false, childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
      for( const mutation of mutationsList ) {
        if (mutation.type === 'childList') {
          initScrollBar();
        };
      };
    };

    const observer = new MutationObserver(callback);
    observer.observe(item, config);
  });

})();
