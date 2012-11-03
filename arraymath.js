/*  arraymath
 *
 * simple array mathematic functions
 *
 * Ben Postlethwaite 2012
 * benpostlethwaite.ca
 */

module.exports = function (o) {

  var opfunc = op(o)

  /*
   * ARRAYMATH
   */
  return function(a, b) {
    if(!isArray(a) || !isArray(b))
      throw new Error("arraymath inputs must be arrays.")
    var i, out = []
    if(a.length === 1) {
      for(i = 0; i < b.length; i++)
        out[i] = opfunc(a, b[i])
      return out
    }
    else if(b.length === 1) {
      for(i = 0; i < a.length; i++)
        out[i] = opfunc(a[i], b)
      return out
    }
    else if (a.length === b.length) {
      for(i = 0; i < a.length; i++)
        out[i] = opfunc(a[i], b[i])
      return out
    }
    else
      throw new Error("Array lengths must be equal")
  }

  /*
   * OP
   */
  function op(o) {
    return function (a, b) {
      var op = {
        "*": a * b
      , "+": a + b
      ,"-": a - b
      ,"/": a / b
      }
      return op[o]
    }
  }

  /*
   * ISARRAY
   */
  function isArray(v) {
    return Object.prototype.toString.call(v) === "[object Array]";
  }


}




