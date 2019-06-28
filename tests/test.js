import { WeElement, define, html } from "omi";

class componentName extends WeElement {
  constructor(...args) {
    super(...args);
    this.abc = 123;
  }

  render() {
    return html`
      <div>
        <p>{this.data.title}</p>
        {<abc />}
      </div>
    `;
  }

  install() {
    this.data = {
      title: "omi"
    };
  }
}

componentName.css = `div{color:#58bc58}div span{font-size:14px}` + 1 + `adda`;
componentName.abc = 1;
define("component-name", componentName);
