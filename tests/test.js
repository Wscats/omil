import { WeElement, define, h } from "omi";

// JS

const componentName = class extends WeElement {
  static css = `p{color:#58bc58}
`;
  render() {
    return h("div", null, h("p", null, this.data.title));
  }

  install() {
    this.data = {
      title: "omi"
    };
  }
};

define("component-name", componentName);
