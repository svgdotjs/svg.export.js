// svg.export.js 0.3 - Copyright (c) 2013 Wout Fierens - Licensed under the MIT license

// Add export method to SVG.Element 
SVG.extend(SVG.Element, {
  // Build node string
  export: function(options, level) {
    var i, il, children, width, height
      , name = this.node.nodeName.toLowerCase()
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
      if (this instanceof SVG.Container) {
        children = this.children()
        
        for (i = 0, il = children.length; i < il; i++)
          node += children[i].export(options, level + 1)
        
      } else if (this instanceof SVG.Wrap) {
        node += this.child.export(options, level + 1)
        
      }
      
      /* close node */
      node += this._whitespaced('</' + name + '>', options.whitespace, level)
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
    var key, attrs, value
      , attr = []
      , data = this.exportAttr()
      , exportAttrs = this.attrs
    
    /* ensure data */
    if (typeof data == 'object')
      for (key in data)
        exportAttrs[key] = data[key]
    
    /* get default values */
    if (SVG._attrExportDefaults) {
      attrs = SVG._attrExportDefaults
      
    } else {
      var draft = this instanceof SVG.Doc ? this.rect(0,0) : this.doc().rect(0,0)
      attrs = SVG._attrExportDefaults = draft.attrs
      draft.remove()
    }
    
    /* build list */
    for (key in exportAttrs) {
      value = exportAttrs[key]
      
      /* add value */
      if (value != attrs[key]) {
        /* enfoce explicit xlink namespace */
        if (key == 'xlink')
          key = 'xmlns:xlink'
        
        /* build value */
        if (key != 'data-svg-export-attr' && (key != 'stroke' || parseFloat(exportAttrs['stroke-width']) > 0))
          attr.push(key + '="' + value + '"')
      }
      
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