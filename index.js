
//console.log("rodou");

const express = require('express');

// Constants
const PORT = 4000;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hellooo world\n');
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
