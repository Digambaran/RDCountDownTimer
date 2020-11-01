/**
 * @typedef timeType
 * @type {Object}
 * @property {Number} h hour
 * @property {Number} m minute
 * @property {Number} s second
 * @property {Number} ms milliseconds
 */

/**
 * function to calculate the time left and return a timeLeft object
 * @param {Number} startingtime starting timestamp
 * @param {Number} total total time left
 * @param {Number} now now
 * @returns {timeType} a timetype object
 */

export default function calculateTimeLeft(startingtime, total, now) {
  let difference = Math.floor(total - (now - startingtime));
  return difference >= 0
    ? {
        h: Math.floor((difference / 3600000) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
        ms: Math.floor((difference / 1) % 1000),
      }
    : {
        h: Math.ceil((difference / 3600000) % 24),
        m: Math.ceil((difference / 1000 / 60) % 60),
        s: Math.ceil((difference / 1000) % 60),
        ms: Math.ceil((difference / 1) % 1000),
      };
}
