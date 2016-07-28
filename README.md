# react-aframe
It is alike aframe-react, but supports more [A-Frame components](https://aframe.io/docs/master/core/component/)

`aframe-react` is a thin layer on top of A-Frame, which is an
[entity-component-system-based](https://aframe.io/docs/master/core/) layer on
top of [three.js](http://threejs.org). It serializes objects, passed as props,
to strings understandable by [A-Frame
components](https://aframe.io/docs/master/core/component/):

```js
<Entity geometry={{primitive: 'box', width: 5}}/>
// to:
<Entity geometry="primitive: box; width: 5"/>
```


### Installation

```bash
npm install --save react-aframe
```

```js
import 'aframe';
import {Entity, Scene} from 'react-aframe';

class ExampleScene extends React.Component {
  render () {
    return (
      <Scene>
        <Entity geometry={{primitive: 'box'}} material="color: red" position={[0, 0, -5]}/>
      </Scene>
    );
  }
}
```

### API

`react-aframe` ships with Scene, Entity, Animation, and those in AFRAME.components

Tha api is pretty much same, but to bind events, use event names as seen in React:

For example, onClick will add listeners for click event, and onClickCapture will add listener and also set capture to true.
(the event handler name will all be lower cased and it won't add '-' for you)

You can also wrap any a-frame tags by using wrapComponent(tagName) ( omit the a- prefix)

```js
import {wrapComponent} from 'react-aframe';
const Box = wrapComponent(box);
// Then use Box like a normal React Component
```
