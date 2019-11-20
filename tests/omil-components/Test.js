import { Component as WeElement, createElement as h } from "react";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class Header extends WeElement {
  render() {
    return h("div", null, this.name);
  }

  constructor() {
    _defineProperty(this, "name", 1);
  }
}

export default Header;
