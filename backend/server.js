var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


let products = [];

app.post('/', function(req, res) {
    const newProduct = {
        productName:req.body.productName,
        quantity:req.body.quantity,
        deliveryDate:req.body.deliveryDate,
        notes:req.body.notes
    }
    products.push(newProduct);
    console.log(products);
});

app.listen(3000)