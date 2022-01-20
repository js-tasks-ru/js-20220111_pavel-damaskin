/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing didn't pass
 */
export function invertObj(obj) {
  if (!obj) {
    return;
  }

  const res = {};

  Object.entries(obj).forEach((item) => {
    const [key, value] = item;

    res[value] = key;
  });

  return res;
}
