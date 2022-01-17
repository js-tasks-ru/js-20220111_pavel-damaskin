/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  if (!isObject(obj)) {
    return;
  }

  const entries = Object.entries(obj);

  const omittedFields = entries.filter(([key]) => {
    return !fields.includes(key);
  });

  return Object.fromEntries(omittedFields);
};

function isObject(item) {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}
