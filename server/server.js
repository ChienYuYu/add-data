const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello~~~~')
})

app.listen(port, () => {
  console.log(`伺服器正在聆聽 ${port} port...`);
})