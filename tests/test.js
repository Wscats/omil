import { WeElement, define, h } from "omi"; // JS

class componentName extends WeElement {
  render() {
    return h("div", null, h("p", null, this.data.title));
  }

  css() {}

  render() {
    console.log(1);
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
p{color:#58bc58};
` +
  1 +
  `adda`;
componentName.abc = 1;
define("component-name", componentName);
