/*  colorgrad
 *
 * A simple way to build a hexadecimal or rgb color gradient
 *
 * Ben Postlethwaite 2012
 * benpostlethwaite.ca
 */

module.exports = function () {

  var that = {}

  /*
   * COLORGRAD
   * -------------------------------------------------
   * function for creating gradients of colors based
   * on starting and or terminating hex or rgb values.
   *
   */
  function colorgrad() {
    var args = Array.prototype.slice.call(arguments)
      , arraymath = require('./arraymath')
      , spec
      , cstep
      , c1 = args[0]
      , c2 = null
      , rgb1
      , rgb2
      , outType = isArray(c1) ? 'rgb': 'hex'
      , add = arraymath("+")
      , sub = arraymath("-")
      , div = arraymath("/")
      , mul = arraymath("*")

    /*
     *
     * Unpack specification object
     *
     */
    if(isObj(args[1])) {
      spec = args[1]
    }
    else if (isObj(args[2])) {
      spec = args[2]
      c2 = args[1]
    }
    else
      spec = {}
    /*
     * Or with defaults
     */
    var lum = spec.lum || 1
      , n = spec.nshades || 100
      , type = spec.type || "linear"

    /*
     *
     * Design the color step array which will be
     * a length 3 vector.
     *
     */
    rgb1 = isArray(c1) ? c1 : hex2rgb(c1)
    if(c2) // If two hexcolors supplied
      rgb2 = isArray(c2) ? c2 : hex2rgb(c2)
    else // 2nd color is lum% incr/decr of color1
      rgb2 = add( mul(rgb1,[lum]), rgb1)

    // Create step size to step through color gradient
    cstep = div( sub(rgb2, rgb1), [n-1])

    var i
      , nc = []
    nc[0] = rgb1
    for (i = 1; i < n; ++i) {
      nc[i] = add(nc[i-1], cstep)
    }

    function clims(c) {
      if(c > 255)
        return 255
      else if(c < 0)
        return 0
      else return c
    }

    var result = []
    nc.forEach(function (ar) {
      ar = ar.map(Math.round).map(clims)
      if(outType === 'hex')
        ar = rgb2hex(ar)
      result.push( ar )
    })
    return result
  }


  /*
   *  HELPER FUNCS
   * --------------------------------------------------------
   */
  /*
   * HEXTORGB
   * public
   * Takes a hex string and outputs an rgb vector as a
   * length 3 int array [red, green, blue]
   * where 0 <= rgb values <= 255
   */
  function hex2rgb(hex) {
    //validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '')
    // If 3 digit hex color
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16)
    , parseInt(result[2], 16)
    , parseInt(result[3], 16)
    ] : null;
  }

  /*
   * RGBTOHEX
   * public
   * Takes a length 3 integer array of rgb values where
   * 0 <= rgbvalue <= 255 and outputs a hexstring
   */
  function rgb2hex(rgbarray) {
    var hex = '#'
    rgbarray.forEach( function (dig) {
      dig = dig.toString(16)
      hex += ("00" + dig).substr( dig.length )
    })
    return hex
  }

  /*
   * ISARRAY
   * private
   */
  function isArray(v) {
    return Object.prototype.toString.call(v) === "[object Array]";
  }

  /*
   * ISOBJ
   * private
   */
  function isObj(v) {
    return (v != null) && (typeof v === 'object') && !isArray(v)
  }


  that.colorgrad = colorgrad
  that.hex2rgb = hex2rgb
  that.rgb2hex = rgb2hex

  return that

}
