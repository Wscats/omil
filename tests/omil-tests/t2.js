var omil = require('../../libs')
omil({
    type: 'extension',
    // file: 'html',
    options: null,
    source: `
    <template name="My-abc">
        connect(
            <div>
                <!-- JSX -->
                <input/>
                <p>123</p>
            </div>
        )
    </template>
    `,
    callback(code) {
        console.log(code.allScript)
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
});