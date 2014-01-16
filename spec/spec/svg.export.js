describe('Export', function() {
  
  afterEach(function() {
    draw.clear()
  })
  
  describe('exportSvg()', function() {

    it('exports an empty document', function() {
      expect(draw.exportSvg()).toMatch(/^<\?xml/)
      expect(draw.exportSvg()).toMatch(/<svg/)
    })

    it('exports a document with elements', function() {
      draw.circle(100)
      draw.rect(100, 100)
      expect(draw.exportSvg()).toMatch(/<ellipse[^>]+rx="50/)
      expect(draw.exportSvg()).toMatch(/<rect[^>]+width="100/)
    })

    it('exports an single element', function() {
      expect(draw.rect(100,100).exportSvg()).toMatch(/^<rect[^>]+width="100[^>]+><\/rect>/)
    })

  })
  
})






