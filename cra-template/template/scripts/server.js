const express = require('express');
const path = require('path');
const app = express();
var buildFolder = process.argv[2];
app.use(express.static(path.join(__dirname, '../', buildFolder)));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../', buildFolder, 'index.html'));
});
console.log('Serving on port: 9000');
app.listen(9000);
