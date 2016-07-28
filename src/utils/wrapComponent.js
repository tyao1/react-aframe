import React, {Component} from 'react';
import serializeProps from './serializeProps';

export default function wrapComponent(tagName) {
  return class extends Component {
    static displayName = tagName;

    _eventListeners = {};

    attachEvent = (el) => {
      if (!this._element) {
        const {props} = this;
        Object.keys(props).forEach(rawKey => {
          if (props[rawKey].constructor === Function && rawKey.indexOf('on') === 0) {
            const key = rawKey.toLowerCase();
            // its a event
            if (key.indexOf('capture') > 0) {
              const domKey = key.substring(2, key.length - 7);
              el.addEventListener(domKey, props[rawKey], true);
            } else {
              const domKey = key.substring(2, key.length);
              el.addEventListener(domKey, props[rawKey]);
            }
            console.log('Event Attached for', rawKey);
            this._eventListeners[rawKey] = props[rawKey];
          }
        });
        this._element = el;
      }
    };

    componentWillReceiveProps(nextProps) {
      Object.keys(nextProps).forEach(rawKey => {
        if (nextProps[rawKey].constructor === Function && rawKey.indexOf('on') === 0) {
          if (this.props[rawKey] !== nextProps[rawKey]) {
            // function is modified or added
            let domKey = rawKey.toLowerCase().substring(2);
            let needCapture = false;
            if (domKey.indexOf('capture') > 0) {
              needCapture = true;
              domKey = domKey.substring(0, domKey.length - 7);
            }

            if (this._eventListeners[rawKey]) {
              // if listener exist, delete
              this._element.removeEventListener(
                domKey,
                this._eventListeners[rawKey],
              );
            }

            if (nextProps[rawKey]) {
              this._element.addEventListener(
                domKey,
                nextProps[rawKey],
                needCapture
              );
              this._eventListeners[rawKey] = nextProps[rawKey];
            } else {
              delete this._eventListeners[rawKey];
            }
          }
        }
      });
    }

    componentWillUnmount() {
      // node will be unmounted, so seems not necessarily to remove listeners
    }

    render() {
      return React.createElement(
        tagName,
        {
          ref: this.attachEvent,
          ...serializeProps(this.props),
        },
        this.props.children,
      )
    }
  }
}
