import PropTypes from "prop-types";
const timeType = PropTypes.exact({
  h: PropTypes.number.isRequired,
  m: PropTypes.number.isRequired,
  s: PropTypes.number.isRequired,
  ms: PropTypes.number.isRequired,
});

export {timeType};
