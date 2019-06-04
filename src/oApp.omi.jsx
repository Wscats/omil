import { WeElement, h } from "omi";

import { define } from "omi";
// import oHeader from "./components/oHeader.omi";
// import oSearch from "./components/oSearch.omi"
// import oPanel from "./components/oPanel.omi"
// import oGallery from "./components/oGallery.omi"
import oFileTest from "./components/oFileTest.omi";
// define("o-header", oHeader)
// define("o-search", oSearch)
// define("o-panel", oPanel)
// define("o-gallery", oGallery)
define("o-file-test", oFileTest);

export default class extends WeElement {
  static css() {
    return `div{color:red}
`;
  }

  render() {
    return h("div", null, h("o-file-test", null));
  }

  static css = `p{color:red}`;
  install() {
    this.data = {
      text: "Omi"
    };
  }
}
