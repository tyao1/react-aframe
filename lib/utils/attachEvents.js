'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = attachEvents;
/*
  props: React Props
  el: Dom ref
 */
function attachEvents(props, el) {
  Object.keys(props).forEach(function (rawKey) {
    var key = rawKey.toLowerCase();
    if (key.indexOf('on') === 0) {
      // 是on事件
      var domKey = key.substring(2, key.length);
      console.log('attached', rawKey, domKey);

      el.addEventListener(domKey, props[rawKey]);
    }
  });
}