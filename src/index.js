import './style.scss';
import {Scroll} from './scroll.js';

(() => {
  const wrap = document.querySelectorAll('.wrap');

  [...wrap].forEach(i => new Scroll(i));

})();
