/**
 * @typedef timeType
 * @type {Object}
 * @property {Number} h hour
 * @property {Number} m minute
 * @property {Number} s second
 * @property {Number} ms milliseconds
 */
/**
 * returns the time passed between now and given time
 * @param {Number} startingtime starting timestamp
 * @returns {timeType} a timetype object
 */
export default function calculateTimePassed(startingtime) {
  const now = new Date().getTime();
  let difference = Math.floor(now - startingtime);
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
