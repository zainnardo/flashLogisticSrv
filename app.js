const express = require('express');
const app = express();
const port = 3000 || process.env.SERVER_PORT;
const lib = require('./controllers/data.delivery.controllers');
const bodyParser = require('body-parser')
let ws = '/flashLogiticWSS';

app.get('/flashLogiticWSS',(req,res) => {
    res.send("TODO Write Content")
    });

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
//ROUTES
app.post(`${ws}/ws_getDataDelivery`, lib.getDataDelivery);
// app.get('/user/:id', lib.getUserById);
app.post(`${ws}/ws_createDataDelivery`, lib.createDataDelivery);
app.delete(`${ws}/ws_deleteDataDelivery/:id`, lib.deleteDataDelivery);
app.put(`${ws}/ws_updateDataDelivery/:id`, lib.updateDataDelivery);


app.listen(port, () => {
    console.log('Server is Running')
})