const express = require('express');
const router = express.Router();
const axios = require('axios');


let products = [
    { name: 'Sopa de lechuga', stock: 10 , price: 30 },
    { name: 'Sopa de boniatos', stock: 10, price: 20 },
    { name: 'Sopa de frutilla', stock: 10, price: 30 },
    { name: 'Sopa de mondongo', stock: 10, price: 40 }
];

router.post('/complete-order', async (req, res) => {
    const clientProducts = req.body.orderDetails.products;
    const unavailableProducts = [];

    clientProducts.forEach(product => {
        const dbProduct = products.find(p => p.name === product.name);
        if (!dbProduct || dbProduct.stock < product.quantity) {
            unavailableProducts.push(product.name);
        }
    });

    if (unavailableProducts.length > 0) {
        return res.status(400).json({
            message: 'Algunos productos no están disponibles',
            unavailableProducts
        });
    }
    let amount = 0

    clientProducts.forEach(product => {
        const dbProduct = products.find(p => p.name === product.name);
        dbProduct.stock -= product.quantity;  
        amount = amount + dbProduct.price * product.quantity
        console.log(dbProduct.price)
    });
    let response;
    console.log('se mando el pago')
    try {
        console.log(amount)
        response = await axios.post('http://localhost:3002/cobrar-pedido', {
            amount
        });
        console.log('pago correcto')
    } catch (error) {

        clientProducts.forEach(product => {
            const dbProduct = products.find(p => p.name === product.name);
            dbProduct.stock += product.quantity;  
        });
        return res.status(400).json({
            message: error.response.data.message,
            error: error.response ? error.response.data : 'Error en el servicio de finanzas'
        });
    }
    console.log('pago perfecto')

    res.status(200).json({
        message: 'Pago completado',
        paymentResponse: response.data,
        updatedStock: products
    });
});

router.get('/products', (req, res) => {
    res.status(200).json(products);
});

module.exports = router;