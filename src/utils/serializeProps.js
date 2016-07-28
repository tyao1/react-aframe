import {utils} from 'aframe';
const {styleParser} = utils;

export default function serializeProps (props) {
  const serialProps = {};
  Object.keys(props).forEach(key => {
    if (['children', 'mixin'].indexOf(key) !== -1) { return; }

    if (props[key].constructor === Function) { return; }

    if (props[key].constructor === Array) {
      //Stringify components passed as array.
      serialProps[key] = props[key].join(' ');
    } else if (props[key].constructor === Object) {
      // Stringify components passed as object.
      serialProps[key] = styleParser.stringify(props[key]);
    } else {
      // Do nothing for components otherwise.
      serialProps[key] = props[key];
    }
  });
  return serialProps;
};