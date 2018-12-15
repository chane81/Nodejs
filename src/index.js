//var express = require('express');
import express from 'express';
var app = express();

app.listen(3000, function() {
  console.log('start! express server on port 3000');
});

console.log('end of server code...');