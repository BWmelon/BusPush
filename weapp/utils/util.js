import {
  hexMD5
} from './md5'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const createCode = (len, radix = 10) => {
  var chars = '0123456789'.split('');
  var code = [],
    i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) {
      code[i] = chars[0 | Math.random() * radix];
    }
  }
  return code.join('');
}

module.exports = {
  formatTime,
  md5: hexMD5,
  createCode
}