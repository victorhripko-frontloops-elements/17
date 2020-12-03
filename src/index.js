import './style.scss';
(() => {

  const wrap = document.querySelector('.wrap');
  const wrapBody = wrap.querySelector('.wrap__body');
  // const scrollHandle = document.querySelector('.scroll__handle');

  // const scrollSize = wrap.offsetHeight / wrap.scrollHeight * 100;
  // scrollHandle.style.height = `${scrollSize}%`;

  const wrapPaddings = getPadding(wrap).top + getPadding(wrap).bottom;
  const maxScroll = wrap.offsetHeight - wrapBody.scrollHeight - wrapPaddings;

  let currentScroll = 0;


  window.addEventListener('wheel', evt => {
    const nextPosition = currentScroll - evt.deltaY;
    currentScroll = nextPosition > 0 ? 0 : nextPosition < maxScroll ? maxScroll : nextPosition;

    wrapBody.style.transform = `translateY(${currentScroll}px)`;
    // scrollHandle.style.transform = `translateY(${transformHandle}px)`;


    console.log(currentScroll)
  });


  function getPadding(elem) {
    return {
      left: parseInt(elem.style.paddingLeft || window.getComputedStyle(elem, null).getPropertyValue('padding-left')),
      right: parseInt(elem.style.paddingRight || window.getComputedStyle(elem, null).getPropertyValue('padding-right')),
      top: parseInt(elem.style.paddingTop || window.getComputedStyle(elem, null).getPropertyValue('padding-top')),
      bottom: parseInt(elem.style.paddingBottom || window.getComputedStyle(elem, null).getPropertyValue('padding-bottom'))
    };
  };

})();
