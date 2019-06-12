var omil = require('../libs')
console.log(omil({
    type: 'extension',
    // file: 'html',
    options: null,
    source: `
    <template  name="my-abc-abc">
        <div>
            <!-- JSX -->
            <p>123</p>
        </div>
    </template>
    <script>
    // JS
    var a = 'abcd'
    import style from './index.css'
    import axios from 'axios'
    module.exports= class {
        css(){
            return 'ooooo'
        }
        install() {
            this.data = {
            }
        }
        render(){
            return
        }
        static routes = [
            {
              path: '/',
              name: 'home',
              component: Home
            },
            {
              path: '/about',
              name: 'about',
              component: About
            }
            // to be append new route.
        ]
        abc
    }
    1
    </script>
    <style lang='scss'>
    p{
        color:red;
        span{
            font-size:14px
        }
    }
    </style>
    `,
    callback(code) {
        // console.log(code)
    }
}).compileSass(`
p{
    color:red;
    span{
        font-size:14px
    }
}
`).then((data) => {
    // console.log(data.text)
}));