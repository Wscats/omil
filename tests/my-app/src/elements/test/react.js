import { WeElement, define, h } from "omi";

class ComponentName extends WeElement {
  render() {
    return hoc(h("div", null, h("p", null, this.state.title)));
  }

  constructor(props) {
    super(props);
    this.state = {
      title: "react"
    };
  }
}

ComponentName.css = `
/* CSS */
p {color: #58bc58};
`;
define("component-name", ComponentName);
