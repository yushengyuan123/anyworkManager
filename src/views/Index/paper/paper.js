/**
 * 判断变量是否为空，
 * @param  {[type]}  param 变量
 * @return {Boolean}      为空返回true，否则返回false。
 */
export function isEmpty(param) {
    if (param) {
        var param_type = typeof (param);
        if (param_type == 'object') {
            //要判断的是【对象】或【数组】或【null】等
            if (typeof (param.length) == 'undefined') {
                if (JSON.stringify(param) == "{}") {
                    return true;//空值，空对象
                }
            } else if (param.length == 0) {
                return true;//空值，空数组
            }
        } else if (param_type == 'string') {
            //如果要过滤空格等字符
            var new_param = param.trim();
            if (new_param.length == 0) {
                //空值，例如:带有空格的字符串" "。
                return true;
            }
        }
        return false;//非空值
    } else {
        //空值,例如：
        //(1)null
        //(2)可能使用了js的内置的名称，例如：var name=[],这个打印类型是字符串类型。
        //(3)空字符串''、""。
        return true;
    }
}
export default { isEmpty };