
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.RW = factory();
  }
}(this, function () {

  var doc = document;
  var body = doc.body;
  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  var RW = {
    create: function(container, options) {
      var rw, content;
      if ( !options ) {
        options = {};
      }
      rw = doc.createElement('iframe');
      if ( container ) {
        container.appendChild(rw);
      }

      content = '<html><head>';

      if ( options.styleString ) {
        content += '<style>' + options.styleString + '</style>';
      }
      if ( options.styleLink ) {
        if ( !Array.isArray(options.styleLink) ) {
          options.styleLink = [options.styleLink];
        }
        options.styleLink.forEach(function(link) {
          content += '<link rel="stylesheet" href="' + link + '" />';
        });
      }

      content += '</head><body>';

      if ( options.content ) {
        content += options.content;
      }

      content += '</body></html>';

      rw.contentDocument.write(content);

      return rw;
    },

    update: function(rw, content) {
      var body = rw.contentDocument.body;
      body.innerHTML = content;
    }
  };

  return RW;
}));
