// svg.export.js 0.6 - Copyright (c) 2013 Wout Fierens - Licensed under the MIT license

// Add export method to SVG.Element 
SVG.extend(SVG.Element, {
  // Build node string
  export: function(options, level) {
    var i, il, width, height
      , name = this.node.nodeName
      , node = ''
    
    /* ensure options */
    options = options || {}
    
    if (options.exclude == null || !options.exclude.call(this)) {
      /* ensure defaults */
      options = options || {}
      level = level || 0
      
      /* set context */
      if (this instanceof SVG.Doc) {
        /* define doctype */
        node += this._whitespaced('<?xml version="1.0" encoding="UTF-8"?>', options.whitespace, level)
        
        /* store current width and height */
        width  = this.attr('width')
        height = this.attr('height')
        
        /* set required size */
        if (options.width)
          this.attr('width', options.width)
        if (options.height)
          this.attr('height', options.height)
      }
      
      if (this instanceof SVG.TextNode) {
       node += this.extractText()
      } else {
       /* open node */
       node += this._whitespaced('<' + name + this.attrToString() + '>', options.whitespace, level)
       
       /* reset size and add description */
       if (this instanceof SVG.Doc) {
         this.attr({
           width:  width
         , height: height
         })
         
         node += this._whitespaced('<desc>Created with svg.js [http://svgjs.com]</desc>', options.whitespace, level + 1)
       }
      
       /* add children */
       if (this instanceof SVG.Container || this instanceof SVG.TextShape) {
         for (i = 0, il = this.children().length; i < il; i++) {
           node += this.children()[i].export(options, level + 1)
         }
       }
       
       /* close node */
       node += this._whitespaced('</' + name + '>', options.whitespace, level)
      }
    }
    
    return node
  }
  // Set specific export attibutes
, exportAttr: function(attr) {
    /* acts as getter */
    if (arguments.length == 0)
      return this.data('svg-export-attr')
    
    /* acts as setter */
    return this.data('svg-export-attr', attr)
  }
  // Convert attributes to string
, attrToString: function() {
    var i, key, value
      , attr = []
      , data = this.exportAttr()
      , exportAttrs = this.attr()
    
    /* ensure data */
    if (typeof data == 'object')
      for (key in data)
        if (key != 'data-svg-export-attr')
          exportAttrs[key] = data[key]
    
    /* build list */
    for (key in exportAttrs) {
      value = exportAttrs[key]
      
      /* enfoce explicit xlink namespace */
      if (key == 'xlink')
        key = 'xmlns:xlink'
      
      /* build value */
      if (key != 'data-svg-export-attr' && (key != 'stroke' || parseFloat(exportAttrs['stroke-width']) > 0))
        attr.push(key + '="' + value + '"')
      
    }

    return attr.length ? ' ' + attr.join(' ') : ''
  }
  // Whitespaced string
, _whitespaced: function(value, add, level) {
    if (add) {
      var whitespace = ''
        , space = add === true ? '  ' : add || ''
      
      /* build indentation */
      for (i = level - 1; i >= 0; i--)
        whitespace += space
      
      /* add whitespace */
      value = whitespace + value + '\n'
    }
    
    return value;
  }
  
})