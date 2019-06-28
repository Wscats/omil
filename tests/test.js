var _class, _temp;

import { Component as WeElement, createElement as h } from "react";
import axios from "axios";
export default connect()(
  ((_temp = _class = class ComponentName extends WeElement {
    constructor(...args) {
      super(...args);
      this.abc = 123;
    }

    render() {
      return h("div", null, h("p", null, this.data.title), h("abc", null));
    }

    install() {
      this.data = {
        title: "omi"
      };
    }

    componentDidMount() {}
  }),
  (_class.css = `div{color:#58bc58}div span{font-size:14px}` + 1 + `adda`),
  (_class.abc = 1),
  _temp)
);
