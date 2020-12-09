import './style.scss';
(() => {

  const wrap = document.querySelector('.wrap');
  const wrapBody = wrap.querySelector('.wrap__body');
  const scroll = wrap.querySelector('.scroll');
  const scrollHandle = scroll.querySelector('.scroll__handle');

  const scrollPercentageSize = wrap.offsetHeight / wrap.scrollHeight * 100;
  scrollHandle.style.height = `${scrollPercentageSize}%`;

  const wrapPaddings = getPadding(wrap).top + getPadding(wrap).bottom;
  const maxScrollContent = wrap.offsetHeight - wrapBody.scrollHeight - wrapPaddings;

  let currentContentPos = 0;

  window.addEventListener('wheel', evt => {
    moveContent(currentContentPos - evt.deltaY);
  });

  function moveContent(pos) {
    currentContentPos = pos > 0 ? 0 : pos < maxScrollContent ? maxScrollContent : pos;
    wrapBody.style.transform = `translate3d(0, ${currentContentPos}px, 0)`;

    moveScroll(currentContentPos / maxScrollContent * 100)
  }

  function moveScroll(pos) {
    let position = (scroll.offsetHeight - scrollHandle.offsetHeight) / 100 * pos;
    scrollHandle.style.transform = `translate3d(0, ${position}px, 0)`;
  }


  function getPadding(elem) {
    return {
      left: parseInt(elem.style.paddingLeft || window.getComputedStyle(elem, null).getPropertyValue('padding-left')),
      right: parseInt(elem.style.paddingRight || window.getComputedStyle(elem, null).getPropertyValue('padding-right')),
      top: parseInt(elem.style.paddingTop || window.getComputedStyle(elem, null).getPropertyValue('padding-top')),
      bottom: parseInt(elem.style.paddingBottom || window.getComputedStyle(elem, null).getPropertyValue('padding-bottom'))
    };
  };

})();
