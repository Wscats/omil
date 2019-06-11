import { WeElement, define, html } from "omi";

const aB = class extends WeElement {
  static css = `div{color:red}
`;
  render() {
    return html`
      <div>
        hello world
      </div>
    `;
  }
};
define("a-b", aB);
