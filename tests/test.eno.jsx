import { WeElement, define, html } from "omi";

const aB = class extends WeElement {
  css() {
    return `div{color:red}
`;
  }

  render() {
    return html`
      <div>
        hello world
      </div>
    `;
  }
};
define("a-b", aB);
