import { render } from 'omi'
// import './assets/index.css'
import './elements/app'

render(<my-app />, '#root', {
    data: {
        count: 0
    },
    sub() {
        this.data.count--
    },
    add() {
        this.data.count++
    },
})
