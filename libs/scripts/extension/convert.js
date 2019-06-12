// enoOmi -> eno-omi

const convertToCamelCase = (str) => {
    let strArr = str.split('-');
    if (strArr[0] === '') {
        strArr.shift()
    }
    for (let i = 1, len = strArr.length; i < len; i++) {
        if (strArr[i] !== '') {
            strArr[i] = strArr[i][0].toUpperCase() + strArr[i].substring(1)
        }
    }
    return strArr.join('')
}

module.exports = {
    convertToCamelCase
}