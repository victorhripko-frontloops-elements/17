function getPadding(elem) {
  return {
    left: parseInt(elem.style.paddingLeft || window.getComputedStyle(elem, null).getPropertyValue('padding-left')),
    right: parseInt(elem.style.paddingRight || window.getComputedStyle(elem, null).getPropertyValue('padding-right')),
    top: parseInt(elem.style.paddingTop || window.getComputedStyle(elem, null).getPropertyValue('padding-top')),
    bottom: parseInt(elem.style.paddingBottom || window.getComputedStyle(elem, null).getPropertyValue('padding-bottom'))
  };
};

export class Scroll {
  constructor(el) {
    this.wrap = el;
    this.content, this.scroll, this.scrollHandle;

    this.wrapPaddings = 0;
    this.maxScrollContent = 0;
    this.scrollPos = 0;

    this.defaultChildrens = [...this.wrap.children];
    this.wrap.innerHTML = '';
    this.createWrap();
  };

  createWrap() {
    const content = document.createElement('div');
    content.className = 'scroll__wrap';

    this.content = content;

    this.defaultChildrens.forEach(item => content.append(item));
    this.wrap.append(content);

    this.wrapPaddings = getPadding(this.wrap).top + getPadding(this.wrap).bottom;
    this.maxScrollContent = this.wrap.offsetHeight - this.content.scrollHeight - this.wrapPaddings;

    this.wrap.style.position = 'relative';

    this.createScroll();
  };

  createScroll() {
    const scrollPercentageSize = this.wrap.offsetHeight / this.wrap.scrollHeight * 100;
    const scroll = document.createElement('div');
    const scrollHandle = document.createElement('div');

    this.scroll = scroll;
    this.scrollHandle = scrollHandle;

    scroll.className = 'scroll';
    scroll.style = `
      position: absolute;
      top: 30px;
      bottom: 30px;
      right: 12px;
      width: 6px;
      background-color: #ddd;
      border-radius: 4px;`;

    scrollHandle.className = 'scroll__handle';
    scrollHandle.style = `
      background-color: black;
      border-radius: inherit;
      height: ${scrollPercentageSize}%`;

    this.wrap.style.overflow = 'hidden';

    scroll.append(scrollHandle)
    this.wrap.append(scroll);

    this.update();
  };

  update() {
    this.wrap.addEventListener('wheel', evt => this.moveContent(this.scrollPos - evt.deltaY));
  };

  moveContent(pos) {
    this.scrollPos = pos > 0 ? 0 : pos < this.maxScrollContent ? this.maxScrollContent : pos;
    this.content.style.transform = `translate3d(0, ${this.scrollPos}px, 0)`;

    this.moveScroll(this.scrollPos / this.maxScrollContent * 100)
  };

  moveScroll(pos) {
    let position = (this.scroll.offsetHeight - this.scrollHandle.offsetHeight) / 100 * pos;
    this.scrollHandle.style.transform = `translate3d(0, ${position}px, 0)`;
  };
};
