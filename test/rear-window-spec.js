

describe('Rear Window', function() {

  var container, RW;

  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
    RW = window.RW;
  });

  afterEach(function() {
    document.body.removeChild(container);
  });



  describe('Creation', function() {

    it('should throw an Error if no container is provided', function() {
      var error;
      try {
        var rw = RW.create();
      } catch(e) {
        error = true;
      }
      expect(error).to.equal(true);
    });

    it('should be able to create an iframe', function() {
      var rw = RW.create(container);
      expect(rw).to.be.an.instanceof(HTMLIFrameElement);
    });

    it('should accept an element to append the iframe to', function() {
      var rw = RW.create(container);
      expect(rw.parentNode).to.equal(container);
    });

  });



  describe('Options', function() {

    it('should support a "content" attribute', function() {
      var options = {
        content: '<p>FOO</p>'
      }
      var rw = RW.create(container, options);
      var outerHTML = rw.contentDocument.body.firstChild.outerHTML;
      expect(outerHTML).to.equal('<p>FOO</p>');
    });

    it('should support a "styleString" string attribute', function() {
      var options = {
        styleString: 'body { color: rgb(255, 0, 0); }'
      };
      var rw = RW.create(container, options);
      var body = rw.contentDocument.body;
      var bodyStyle = rw.contentWindow.getComputedStyle(body);
      var bodyColor = bodyStyle.getPropertyValue('color');
      expect(bodyColor).to.equal('rgb(255, 0, 0)');
    });

    it('should support a "styleLink" string attribute', function(done) {
      var options = {
        styleLink: 'base/test/style-1.css'
      };
      var rw = RW.create(container, options);
      checkStylesOnLoad(rw, options.styleLink, [
        {selector: 'body', property: 'color', value: 'rgb(255, 0, 0)'}
      ], done);
    });

    it('should support a "styleLink" array attribute', function(done) {
      var options = {
        styleLink: [
          'base/test/style-1.css',
          'base/test/style-2.css'
        ]
      };
      var rw = RW.create(container, options);
      checkStylesOnLoad(rw, options.styleLink, [
        {selector: 'body', property: 'color', value: 'rgb(255, 0, 0)'},
        {selector: 'body', property: 'font-size', value: '100px'}
      ], done);

    });

    it('should support an "iframeAttributes" option', function() {
      var options = {
        iframeAttributes: {
          id: 'rw',
          frameborder: '0'
        }
      };
      var rw = RW.create(container, options);
      expect(rw.getAttribute('id')).to.equal('rw');
      expect(rw.getAttribute('frameborder')).to.equal('0');
    });

    it('should substitute classString for class in iframeAttributes', function() {
      var options = {
        iframeAttributes: {
          classString: 'rear-window foo'
        }
      };
      var rw = RW.create(container, options);
      expect(rw.getAttribute('class')).to.equal('rear-window foo');
    });

  });



  describe('Update', function() {

    it('should update content', function() {
      var rw = RW.create(container);
      RW.update(rw, '<p>LOREM</p>');
      var outerHTML = rw.contentDocument.body.firstChild.outerHTML;
      expect(outerHTML).to.equal('<p>LOREM</p>');
    });

    it('should not affect the HEAD', function() {
      var options = {
        styleString: 'body { color: rgb(255, 0, 0); }'
      };
      var rw = RW.create(container, options);
      var head = rw.contentDocument.head;
      var headStringBefore = head.innerHTML;
      var headStringAfter;
      RW.update(rw, '<p>LOREM</p>');
      headStringAfter = head.innerHTML;
      expect(headStringBefore).to.equal(headStringAfter);
    });

  });

});


function checkStylesOnLoad(rw, styles, props, cb) {
  if ( !Array.isArray(styles) ) {
    styles = [styles];
  }
  var loadedLength = styles.length;
  var loadedCount = 0;
  styles.forEach(function(link) {
    var img = rw.contentDocument.createElement('img');
    img.src = link;
    img.onerror = function() {
      loadedCount++;
      if ( loadedCount === loadedLength ) {
        onAllStylesLoaded();
      }
    };
  });
  function onAllStylesLoaded() {
    props.forEach(function(propObject) {
      var selector = propObject.selector;
      var property = propObject.property;
      var value = propObject.value;

      var el = rw.contentDocument.querySelector(selector);
      var elStyle = rw.contentWindow.getComputedStyle(el);
      var styleValue = elStyle.getPropertyValue(property);
      expect(styleValue).to.equal(value);
    });
    cb();
  }
}
