/**
 * 字符串填充函数
 * @param  {string} value      目标字符串
 * @param  {array} position 需要填充的位置
 * @param  {string} padstr   填充字符串
 * @return {string}          返回目标字符串
 */
export const padStr = (value, position, padstr) => {
  position.forEach((item, index) => {
    if (value.length > item + index) {
      value =
        value.substring(0, item + index) +
        padstr +
        value.substring(item + index);
    }
  });
  value = value.trim();
  return value;
};