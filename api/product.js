const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

// insert on product
router.post('/api/product', (req, res) => {
	let product = req.body;
	const  _id = 'product' + new Date().getTime();
	product._id = _id;
	product.timestamp = Date();
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
	const sortList = ['timestamp', 'sku', 'price'];
	const sortby = query.sortby || 'timestamp';
	const asc = query.asc || 1;
	let sort = {};
	sort[sortby] = asc;
	const keyword = query.keyword || null;
	let q = {};
	if (keyword) {
		const reg = new RegExp(keyword, 'i') //不区分大小写
		q = {
	        $or : [ //多条件，数组
	            {description : {$regex : reg}},
	            {title : {$regex : reg}}
	        ]
	    };
	}
	db.product.count(q).then(function(count){
		db.product.find(q).sort(sort).limit(size).skip(current - 1).then(function(doc){
			res.status(200).send({total:count,list:doc,current:current})
		}).catch(err => {
	    	console.error(err);
	    	res.status(500).send({code:500})
	    })
	})
})

module.exports = router