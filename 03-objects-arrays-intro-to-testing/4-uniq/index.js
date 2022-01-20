/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (!arr) {
    return [];
  }

  /* --- First Attempt --- */
  /*const res = {};

  arr.forEach((item) => {
    res[item] = null;
  });

  return Object.keys(res);
  */

  /* --- Second Attempt --- */
  const res = [];

  arr.forEach((item) => {
    if (!res.includes(item)) {
      res.push(item);
    }
  });

  return res;
}
