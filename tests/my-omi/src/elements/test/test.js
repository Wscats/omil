import { WeElement, define, h } from "omi";

class ComponentName extends WeElement {
  constructor(...args) {
    super(...args);
    this.myCSS = `
            h1{
                color: green;
            }
        `;

    this.onClick = () => {
      this.myCSS = `
                h1{
                    color: blue;
                }
            `;
      this.update();
    };
  }

  render(props) {
    return h(
      "div",
      {
        onClick: this.onClick
      },
      "hello world"
    );
  }
}

ComponentName.css = ``;
define("component-name", ComponentName);
