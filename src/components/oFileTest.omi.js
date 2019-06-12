import { WeElement, h } from "omi";

import axios from "axios";
import logo from "../assets/logo.png";

export default class extends WeElement {
  render() {
    return h(
      "div",
      null,
      h("img", {
        src: this.data.logo
      }),
      h("p", null, "123")
    );
  }

  /*static css = `
    div{
        color: red;
        p {
            font-size: 28px;
            color: blue;
        }
    }
`+ 'div{color:blue}'*/
  async install() {
    this.data = {
      title: "Omi",
      logo
    };
    const data = await axios.get("https://cnodejs.org/api/v1/topics");
    console.log(data);
    // debugger
  }
}
