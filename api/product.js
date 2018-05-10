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
        res.status(200).send({_id:_id})
    }).catch(err => {
    	console.error(err);
    	res.status(500).send({code:500})
    })
})

// get all product list
router.get('/api/products', (req, res) => {
	console.log(req);
	const query = req.query;
	const size = Number(query.size) || 10;
	const current = Number(query.current) || 1;
	const keyword = query.keyword || null;
	db.product.count().then(function(count){
		db.product.find({}).limit(size).skip(current - 1).then(function(doc){
			res.status(200).send({total:count,list:doc,current:current})
		}).catch(err => {
	    	console.error(err);
	    	res.status(500).send({code:500})
	    })
	})
})

module.exports = router