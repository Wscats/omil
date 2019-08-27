import { WeElement, define, h } from "omi";

class ComponentName extends WeElement {
  render(props) {
    return h("div", null, this.data.title);
  }

  install() {
    this.data = {
      title: "Hello World"
    };
  }
}

ComponentName.css = `
    /* CSS */
    p {
        color: #58bc58
    }
`;
define("component-name", ComponentName);
