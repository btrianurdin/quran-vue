/**
 * Remove all non-alphanumeric characters from a string
 * @param {string} str
 * @return {string}
 */
const removeNonAlphanumeric = (str) => {
  return str?.replace(/[^a-zA-Z0-9 ]/g, '')
}

export default removeNonAlphanumeric
