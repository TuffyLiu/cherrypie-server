const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

// insert on product
router.post('/api/product', (req, res) => {
	let product = req.body;
	const  _id = 'product' + new Date().getTime();
	product._id = _id;
	product.date = Date();
    new db.product(product).save().then(() => {
        res.status(200).send({code:1})
    }).catch(err => {
    	res.status(500).send({code:-1})
    })
})