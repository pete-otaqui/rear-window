# Rear Window

[![Build Status](https://travis-ci.org/pete-otaqui/rear-window.svg?branch=master)](https://travis-ci.org/pete-otaqui/rear-window)

Rear Window lets you easily create iframes with HTML contents.

## Example Usage

```javascript
// assuming browserify is in place
var RW = require('rear-window');

var container = document.createElement('div');
document.body.appendChild(container);

var options = {
  styleString: 'body { color: rgb(255, 0, 0); }',
  content: '<p>Lorem Ipsum</p>'
}
var iframe = RW.create(container, options);

// note - update() overwrites any existing body contents
RW.update(iframe, '<h1>New Content</h1><p>Overwrites existing content.</p>');
```

## Installation

Rear Window is written with a module definition to support:

* Global inclusion in a browser, just include the `rear-window.js` file and you will get `RW` in the global scope
* AMD / RequireJS - `require(['rear-window/rear-window'], function(RW) {/* ...*/ })`
* CommonJS-style / Browserify - `var RW = require('rear-window')`

## API

### `RW.create(HTMLElement container, Object options)`

* Creates a new iframe, appended to `container`.
* Returns the HTMLIFrame element.
* Supports the following options:

| Option | Type | Description |
| ------ | ---- | ----------- |
| `options.iframeAttributes` | Object | Attributes to apply to the iframe, such as `id`, `style`, `frameborder`, etc.  The key `classString` will be mapped to the `class` attribute. |
| `options.styleString` | String | Will be inserted into the head of the iframe, as the contents of a `<style>` tag |
| `options.styleLink` | [String\|Array] | Will be inserted into the head of the iframe as the href of one or more `<link rel="stylesheet"/>` tags |
| `options.content` | String | Contents to inject into the `<body>` of the new iframe |


**Example**:

```javascript
// assuming global <script> inclusion
var RW = window.RW;

var container = document.createElement('div');
document.body.appendChild(container);

var options = {
  iframeAttributes: {
    classString: 'iframe-noborder full-height etc' // mapped to 'class'
    id: 'one-and-only-iframe',
    'data-foo': 'bar'
  },
  styleString: 'body { color: #ff0000; }',
  styleLink: 'styles/iframe.css', // an array of URLs is also acceptable
  content: '<h1>Sample Content</h1><p>No need to call update()</p>'
};

var iframe = RW.create(container, options);
```

### `RW.update(HTMLIFrameElement iframe, String contents)`

* Updates the `<body>` content of an existing iframe.
* Does not have to be an iframe created by rear-window.
* Overwrites existing content.
* Leaves the `<head>` untouched.

**Example**

```javascript
// assuming browserify is in place
var RW = require('rear-window');

var container = document.createElement('div');
document.body.appendChild(container);

var iframe = RW.create(container);
RW.update(iframe, '<h1>Sample Content</h1>');
// note - update() overwrites any existing body contents
RW.update(iframe, '<h1>New Content</h1><p>Overwrites existing content.</p>');
```

