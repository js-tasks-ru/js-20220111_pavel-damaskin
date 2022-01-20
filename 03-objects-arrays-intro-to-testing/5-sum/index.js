/**
 * Sum - returns sum of arguments if they can be converted to a number
 * @param {number} n value
 * @returns {number | function}
 */
export function sum (n) {
  let res = (n) ? n : 0;

  function fx(n) {
    res += (n) ? n : 0;
    return fx;
  }

  fx.toString = () => {
    return res;
  };

  return fx;
}
