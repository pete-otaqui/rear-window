# Rear Window

[![Build Status](https://travis-ci.org/pete-otaqui/rear-window.svg?branch=master)](https://travis-ci.org/pete-otaqui/rear-window)

Rear window let's you easily create iframes with HTML contents.

## Simple Usage

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

## Options

Rear Window also supports providing options for:

* inserting `<body>` content immediately
* setting iframe attributes
* adding `<link rel="stylesheet" />` tags to the `<head>` of the iframe
* adding `<style>` tags to the `<head>` of the iframe

```javascript
// assuming global <script> inclusion
var RW = window.RW;

var container = document.createElement('div');
document.body.appendChild(container);

var options = {
  styleString: 'body { color: #ff0000; }',
  styleLink: 'styles/iframe.css', // an array of URLs is also acceptable
  content: '<h1>Sample Content</h1><p>No need to call update()</p>',
  iframeAttributes: {
    classString: 'iframe-noborder full-height etc' // classString is used to be safe
    id: 'one-and-only-iframe',
    'data-foo': 'bar'
  }
};

var iframe = RW.create(container);
RW.update(iframe, '<h1>Sample Content</h1>');
```
