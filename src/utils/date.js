/**
 *   获取年月日
 *   @returns {string}  yyyy-mm-dd
 */

export function getDate() {
    const date = new Date()
    return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate())
}

/**
 *   获取时分秒
 *   @returns {string}  hh:mm:ss
 */

export function getTime() {
    const date = new Date()
    return addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
}

/**
 *   如果小于10 ，就补0
 *   @param {string} date
 *   @returns {string}  date
 */
function addZero(item) {
    return item > 9 ? item : '0' + item
}