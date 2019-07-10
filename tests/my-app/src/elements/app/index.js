import { define, WeElement } from 'omi'
import logo from './logo.svg'
import '../app-intro'
import '../test/test'
import 'omiu/button'
define('my-app', class extends WeElement {
  static css = require('./_index.less')

  name = 'Omi'

  clickHandler = () => {
    this.name = 'Omio'
    this.update()
  }

  render() {
    return (
      <div class="app">
        <component-name />
      </div>
    )
  }
})
