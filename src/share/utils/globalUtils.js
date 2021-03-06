//所有人可能会用的工具类
/**
 * 时间格式规范化工具，整理成为形如03:36:29格式的时间
 * @param currentDate new Data类型 别搞别的类似参数
 * @returns {string} 返回符合格式的时间
 * @author 小余
 */
export function formatDate(currentDate) {
    //参数大小校验，如果得到的描述>10，则直接返回，如果<10的话则变为0*的格式返回
    let hours = verifyDateFormat(currentDate.getHours())
    let minutes = verifyDateFormat(currentDate.getMinutes())
    let seconds = verifyDateFormat(currentDate.getSeconds())

    return `${hours}:${minutes}:${seconds}`
}

export function verifyDateFormat(value) {
    return value >= 10 ? value : `0${value}`
}

//获取当前时间，并转变为yyyy-MM-dd的格式
export function getCurrentDate() {
    return formatDate(new Date())
}

// 获取上传图片的blob地址 ,用于选择完文件之后 然后马上获取图片地址 进行图片预览
export function getImageSrc(file) {
    let reader = new FileReader();

    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
        reader.onload = (event) => {
            let blob = new Blob([event.target.result]);
            window.URL = window.URL || window.webkitURL;
            let blobURL = window.URL.createObjectURL(blob);
            resolve(blobURL);
        }
    })
}
