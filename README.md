The node module [color](https://github.com/harthur/color) is a better module for most things. Building out linear luminosity increases and decreases was needed for my project so I wrote this thing. If you have a central color or end point colors and want a color map array which linearly increases or decreases away from it, this is a helpful module. It also does't care if you chuck in rgb or hex, it just spits out whatever you put in. For example:

```javascript
var cg =  require('./colorgrad')()

var cops = {
  "lum": -1
, "nshades": 10
, "type": "linear"
}

var cglwr = cg.colorgrad('#0000FF', '#FFFFFF',cops)
var cgupr = cg.colorgrad('#FFFFFF', '#FF0000',cops)

cglwr.pop() // pop off centre duplicate
var c = cglwr.concat(cgupr)
console.log(c)
```
which outputs

```bash
[ '#0000ff',
  '#1c1cff',
  '#3939ff',
  '#5555ff',
  '#7171ff',
  '#8e8eff',
  '#aaaaff',
  '#c6c6ff',
  '#e3e3ff',
  '#ffffff',
  '#ffe3e3',
  '#ffc6c6',
  '#ffaaaa',
  '#ff8e8e',
  '#ff7171',
  '#ff5555',
  '#ff3939',
  '#ff1c1c',
  '#ff0000' ]
```

Right now the only style of progression is linear, though I would like to implement exponential and square root.
The defaults are `nshades = 100`, `type = linear`, `lum = 1`.
The `lum` option sets the percentage total luminosity increase. The luminosity step size is lum / number of steps. For rgb input it would look like:

```javascript
var ops = {
  "lum": 10
, "nshades": 10
}

var cga = cg.colorgrad([10,10,10], ops)

console.log(cga)
```
which outputs
```bash
[ [ 10, 10, 10 ],
  [ 21, 21, 21 ],
  [ 32, 32, 32 ],
  [ 43, 43, 43 ],
  [ 54, 54, 54 ],
  [ 66, 66, 66 ],
  [ 77, 77, 77 ],
  [ 88, 88, 88 ],
  [ 99, 99, 99 ],
  [ 110, 110, 110 ] ]
```


## Install
```bash
$ npm install colorgrad
```

You can put colorgrad in the browser using [browserify](https://github.com/substack/node-browserify)
