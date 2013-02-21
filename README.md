# svg.export.js

A plugin for the [svgjs.com](http://svgjs.com) library export a whole svg canvas or just a single element.

Svg.export.js is licensed under the terms of the MIT License.

## Usage
Include this plugin after including the svg.js library in your html document.

To export the whole svg canvas:

```javascript
var draw = svg('paper').size(400, 400)
var rect = draw.rect(100, 100)

var svgExport = rect.export()
```

By default the exported svg is compressed. If you want to have a more readable output you can require whitespace:

```javascript
var svgExport = draw.export({ whitespace: true })
```

The default whitespace indentation is two spaces. You can also define you own indentation style, with tabs for example:

```javascript
var svgExport = draw.export({ whitespace: '\t' })
```

Finally, if you are exporting the whole svg canvas you can set a target `width` and `height`. This is especially useful if you are using a the `viewbox()` method on your svg canvas:

```javascript
var draw = svg('paper').size(400, 400).viewbox(0,0,200,200)
var rect = draw.rect(100, 100)

var svgExport = rect.export({ width: '150mm', height: '150mm' })
```