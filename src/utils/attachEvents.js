/*
  props: React Props
  el: Dom ref
 */
export default function attachEvents(props, el) {
  Object.keys(props).forEach(rawKey => {
    const key = rawKey.toLowerCase();
    if (key.indexOf('on') === 0) {
      // 是on事件
      const domKey = key.substring(2, key.length);
      console.log('attached', rawKey, domKey);

      el.addEventListener(domKey, props[rawKey]);
    }
  });
}
