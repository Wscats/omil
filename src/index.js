import {
    h,
    render,
    define,
} from 'omi';
import oApp from './oApp.omi'

define('o-app', oApp)
render(h('o-app'), 'body')