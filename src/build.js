const fs = require('fs');
const path = require('path');

const fileName = process.argv[2] || '../test-files/WebTest.bike';
const bikeFile = path.resolve(__dirname, fileName);

fs.readFile(bikeFile, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // look for head and insert css link
  const lines = data.toString().split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '  <head>') {
      lines.splice(i + 1, 0, '    <script defer src="http://localhost:8888/src/app.js"></script>');
      lines.splice(i + 1, 0, '    <link rel="stylesheet" href="http://localhost:8888/src/app.css">');
      break;
    }
  }

  const webFile = path.resolve(__dirname, '../build/index.html');

  fs.writeFile(webFile, lines.join('\n'), (err) => {
    if (err) {
      console.error(err);
    }
  })
})