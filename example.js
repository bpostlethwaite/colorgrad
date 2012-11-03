var cg =  require('./colorgrad')()

var cops = {
  "lum": -1
, "nshades": 51
, "type": "linear"
}

var cglwr = cg.colorgrad('#0000FF', '#FFFFFF',cops)
var cgupr = cg.colorgrad('#FFFFFF', '#FF0000',cops)
//
cglwr.pop() // pop off duplicate
var c = cglwr.concat(cgupr)
console.log(c)

/*
var canvas = document.getElementById('canvas')
  , c = canvas.getContext('2d')
  , i


for (i = 0; i < cg.length; ++i) {
  c.fillStyle = cg[i] // start ind at index 0
  c.fillRect(i*10, 1, 10, 200)
  c.fillStyle = cg[i] // start ind at index 0
  c.fillRect(i*10, 201, 10, 200)
}
*/

