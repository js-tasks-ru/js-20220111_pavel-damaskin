/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  if (!isObject(obj)) {
    return;
  }

  const entries = Object.entries(obj);

  const pickedFields = entries.filter(([key]) => {
    return fields.includes(key);
  });

  return Object.fromEntries(pickedFields);
};

function isObject(item) {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}
