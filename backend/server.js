var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const {FARMERS} = require('./farmers');

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


let products = [];

// GET endpoint to retrieve all requirements (optional - for fetching existing requirements)
app.get('/api/requirements', function(req, res) {
    res.status(200).json({
        message: 'Requirements endpoint is available. Use POST to submit new requirements.',
        products: products
    });
});

app.post('/api/requirements', function(req, res) {
    const { productName, quantity, deliveryDate, notes } = req.body;
    
    // Store the requirement
    const requirement = {
        productName,
        quantity,
        deliveryDate,
        notes,
        createdAt: new Date().toISOString()
    };
    products.push(requirement);
    
    const matchingFarmers = FARMERS.filter(farmer => {
        return productName.toLowerCase().includes(farmer.product.toLowerCase());
    });

    const notifiedFarmers = [];

    matchingFarmers.forEach(farmer => {
        const emailContent = `Hi ${farmer.name}, A buyer needs ${productName} (${quantity}) by ${deliveryDate}. Notes: ${notes}`;
        console.log(`[EMAIL SIMULATED to ${farmer.email}]: ${emailContent}`); // [cite: 21]
        notifiedFarmers.push(farmer.name);
    });

    res.status(200).json({
        message: 'Requirement processed.',
        notifiedFarmers: notifiedFarmers
    });
});

app.listen(3000)