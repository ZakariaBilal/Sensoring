let _ = require("underscore");

/**
 * @param {array} data : array of data. The first element is ALWAYS an error
 * @param {array} codes : array of the http codes corresponding to the data.
 */
module.exports.build = (res, data, codes = [500, 200]) => {
  if (data[0]) {
    console.error(data[0]);
    return res.status(codes[0]).json({ error: data[0] });
  }
  
  // remove first element in array
  data.shift();
  codes.shift();

  _.each(data, (d, index) => {
    if (d) {
      return res.status(codes[index]).json(d);
    }
  });
};
