const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT || 3333, function (err: any) {
  if (err) console.error(err);
  console.log(`API INICIADA NA PORTA ${3333}`);
});
