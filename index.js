const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      massive = require('massive');

require('dotenv').config();

// app is a server
const app = express();
let port = 3000;

const productCtrl = require('./products_controller');

massive(process.env.CONNECTION_STRING)
       .then(db => app.set('db', db));


// middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/api/products', productCtrl.getAll);
app.get('/api/products:id', productCtrl.getOne);
app.put('/api/product/:id', productCtrl.update);
app.post('api/product', productCtrl.create);
app.delete('/api/product/:id', productCtrl.delete);

// set up server on port 3000
app.listen(port, console.log(`Listening on port ${port}`));