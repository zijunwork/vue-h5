/*
 * @Overview:   Object-methods
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 15:36
 * @Mark:       //
 */

/**
 * 两个数组合并一个对象
 * @param arr1 {array} 被合并数组，在对象中以 键 存在
 * @param arr2 {array} 被合并数组，在对象中以 值 存在
 * @return {object} 返回键值对的对象
 */
export const arrContactObject = (arr1, arr2) => {
  let obj = {};
  for (let i = 0; i < arr1.length; i++) {
    obj[arr1[i]] = arr2[i];
  }
  return obj;
};

/**
 * 深拷贝，支持常见类型
 * @param {*} values 复制之前的数据
 * @return {{}|Array|Date|*}
 */
export const deepClone = values => {
  let copy;
  if (values === null || typeof values !== "object") return values;
  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }
  if (values instanceof Array) {
    copy = [];
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }
  if (values instanceof Object) {
    return JSON.parse(JSON.stringify(values));
  }
  throw new Error("Unable to copy values! Its type isn't supported.");
};
