/**
 * @typedef timeType
 * @type {Object}
 * @property {Number} h hour
 * @property {Number} m minute
 * @property {Number} s second
 * @property {Number} ms milliseconds
 */

/**
 * returns millisecond value
 * @param {timeType}
 * @return {Number} in milliseconds
 */
export default function calculateMilliSeconds({h, m, s, ms}) {
  return h * 3600000 + m * 60000 + s * 1000 + ms;
}
