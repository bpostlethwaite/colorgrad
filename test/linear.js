var test = require('tape')
var cg = require('../')()

test('hex/rbg linear end-to-end', function (t) {
  t.plan(2)

  var ops = {
    "nshades": 3
  }


  var hex = cg.colorgrad('#0000FF', '#FFFFFF', ops)

  var rgb = cg.colorgrad([60,60,60], [120,120,120], ops)

  var expectedhex = [ '#0000ff', '#8080ff', '#ffffff' ]
  var expectedrgb = [ [ 60, 60, 60 ], [ 90, 90, 90 ], [ 120, 120, 120 ] ]

  t.same(hex, expectedhex, "hex point-to-point")
  t.same(rgb, expectedrgb, "rgb point-to-point")
  t.end()

})

test('hex/rgb linear end-to-lum', function (t) {
  t.plan(2)

  var ops = {
    "lum": -2
  , "nshades": 4
  }

  var hex = cg.colorgrad("#808080", ops)

  var expectedhex = [ '#808080', '#2b2b2b', '#000000', '#000000' ]


  ops = {
    "lum": 2
  , "nshades": 4
  }

  var rgb = cg.colorgrad([128, 128, 128], ops)

  var expectedrgb = [ [ 128, 128, 128 ],
                      [ 213, 213, 213 ],
                      [ 255, 255, 255 ],
                      [ 255, 255, 255 ] ]

  t.same(hex, expectedhex, "hex point-to-lum increase")
  t.same(rgb, expectedrgb, "rgb point-to-lum increase")
  t.end()

})

