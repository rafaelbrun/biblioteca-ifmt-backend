const cors = require('cors');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  // eslint-disable-next-line no-console
  console.log(`API INICIADA NA PORTA ${3333}`);
});
