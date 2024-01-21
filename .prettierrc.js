module.exports = {
    tabWidth: 2,
    semi: true,
    printWidth: 140,
    singleQuote: true,
    // 每个属性换行
    // singleAttributePerLine:true,
    quoteProps: 'consistent',
    // htmlWhitespaceSensitivity: 'strict',
    vueIndentScriptAndStyle: true,
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 箭头函数，只有一个参数的时候，也需要括号 <always 默认 | avoid 省略括号>
    // arrowParens: 'always',
    trailingComma: 'es5', //是否使用尾逗号，有三个可选值"<none|es5|all>"
};
