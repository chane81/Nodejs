'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); //var express = require('express');


app.listen(3000, function () {
  console.log('start! express server on port 3000');
});

console.log('end of server code...');