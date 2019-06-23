import { WeElement, define, h } from "omi"; // JS

class componentName extends WeElement {
  constructor(...args) {
    super(...args);
    this.abc = 123;
  }

  render() {
    return h("div", null, h("p", null, this.data.title));
  }

  install() {
    this.data = {
      title: "omi"
    };
  }
}

componentName.css =
  `
    /* CSS */
    div {
        color: #58bc58;
        span {
            font-size: 14px;
        }
    }
` +
  1 +
  `adda`;
componentName.abc = 1;
define("component-name", componentName);
