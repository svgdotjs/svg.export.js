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

var svgExport = draw.export({ width: '150mm', height: '150mm' })
```

## Exporting elements
Individual elements can be exported as well:

```javascript
var draw = svg('paper')
var rect = draw.rect(100, 100)

var exportedRect = rect.export()
```

## Export attributes
In some cases you might want elements to be exported with different attribute values:

```javascript
var draw = svg('paper').size(400,400)
var rect = draw.rect(100, 100).fill('#333').data('export-attr', { fill: '#f06' })

var svgExport = draw.export({ whitespace: true })
```

Will produce:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
  <desc>Created with svg.js [http://svgjs.com]</desc>
  <defs>
  </defs>
  <rect fill="#f06" width="100" height="100">
  </rect>
</svg>
```

## Excluding elements
In some cases you might want to exclude some elements from the export and here is how to achieve that:

```javascript
var draw = svg('paper')
var rect = draw.rect(100, 100)
var circle = draw.circle(100)

var svgExport = draw.export({
  exclude: function() {
    return this.type == 'circle'
  }
})
```

A great way to approach this is to bind a data attribute to the elements you want to be excluded:

```javascript
var draw = svg('paper')
var rect = draw.rect(100, 100)
var circle = draw.circle(100).data('exclude', true)

var svgExport = draw.export({
  exclude: function() {
    return this.data('exclude')
  }
, whitespace: true
})
```

This will produce the following output:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
  <desc>Created with svg.js [http://svgjs.com]</desc>
  <defs>
  </defs>
  <rect width="100" height="100">
  </rect>
</svg>
```