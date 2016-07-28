import {utils} from 'aframe';
const {styleParser} = utils;

export default function serializeProps (props) {
  const serialProps = {};
  Object.keys(props).forEach(key => {
    if (['children', 'mixin'].indexOf(key) !== -1) { return; }

    if (typeof props[key] === 'function') { return; }

    if (Array.isArray(props[key])) {
      //Stringify components passed as array.
      serialProps[key] = props[key].join(' ');
    } else if (typeof props[key] === 'object') {
      // Stringify components passed as object.
      serialProps[key] = styleParser.stringify(props[key]);
    } else {
      // Do nothing for components otherwise.
      serialProps[key] = props[key];
    }
  });
  return serialProps;
};