/**
 * @param {base} a
 * @param {exp} b
 * @param {mod} n
 * @returns a^b % n
 */

module.exports = (a, b, n) => {
  a = a % n;
  var result = 1;
  var x = a;

  while (b > 0) {
    var lsb = b % 2;
    b = Math.floor(b / 2);

    if (lsb === 1) {
      result = result * x;
      result = result % n;
    }

    x = x * x;
    x = x % n;
  }
  return result;
};
