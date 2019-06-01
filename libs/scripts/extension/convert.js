// enoOmi -> eno-omi

const convertToCamelCase = (str) => {
    // 去除中划线分隔符获取单词数组
    let strArr = str.split('-');
    // 如果第一个为空，则去掉
    if (strArr[0] === '') {
        strArr.shift()
    }
    // 遍历第二个单词到最后一个单词，并转换单词首字母为答谢
    for (let i = 1, len = strArr.length; i < len; i++) {
        // 如果不为空，则转成大写
        if (strArr[i] !== '') {
            strArr[i] = strArr[i][0].toUpperCase() + strArr[i].substring(1)
        }
    }
    return strArr.join('')
}

module.exports = {
    convertToCamelCase
}