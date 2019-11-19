import {
    h,
    render,
    define,
} from 'omi';
import oApp from './oApp.omi'
import stores from './stores/stores'
define('o-app', oApp)
render(h('o-app'), 'body', stores)