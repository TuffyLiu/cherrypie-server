const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

/**
 * insert on product
 * @ProductSchema {ProductSchema}
 */
// insert on product
router.post('/api/product', (req, res) => {
	let product = req.body;
	const  _id = 'product' + new Date().getTime();
	product._id = _id;
	product.timestamp = new Date();
	product.updateTime = new Date();
    new db.product(product).save().then(() => {
        res.status(200).send({_id:_id});
    }).catch(err => {
    	console.error(err);
    	res.status(500).send({msg:'Server Error'});
    });
});

/**
 * update one product
 * @ProductSchema {ProductSchema}
 */
router.put('/api/product', (req, res) => {
	let product = req.body;
	let _id = product._id;
	delete product._id;
	product.updateTime = new Date();
	db.product.update({_id: _id}, product, (err, data) => {
        res.status(200).send();
    }).catch(err => {
    	console.error(err);
    	res.status(500).send({msg:'Server Error'});
    });
});

/**
 * get all product list
 * @size {Number} max size
 * @current {Number} current page
 * @sortby {String} sortby field ['timestamp', 'sku', 'price']
 * @asc {Number} ascending order 0/1
 */
router.get('/api/products', (req, res) => {
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
		const reg = new RegExp(keyword, 'i'); //不区分大小写
		q = {
	        $or : [ //多条件，数组
	            {description : {$regex : reg}},
	            {title : {$regex : reg}},
	            {occasion: keyword},
	            {'details.value': {$regex : reg}}
	        ]
	    };
	}
	db.product.count(q).then(function(count){
		db.product.find(q).sort(sort).limit(size).skip(current - 1).then(function(doc){
			res.status(200).send({total:count,list:doc,current:current});
		}).catch(err => {
	    	console.error(err);
	    	res.status(500).send({msg:'Server Error'});
	    });
	});
});

/**
 * get product by  _id
 * @_id {[String]}
 */
router.get('/api/product/:id', (req, res) => {
	const _id = req.params.id;
	db.product.find({_id: _id}).then(function(doc){
		if(doc.length > 0) {
			res.status(200).send(doc[0]);
		} else{
			res.status(404).send({msg:'Not Found'});
		}
	}).catch(err => {
    	console.error(err);
    	res.status(500).send({msg:'Server Error'});
    });
});

/**
 * delete product by  _id
 * @_id {[String]}
 */
router.delete('/api/product/:id', (req, res) => {
	const _id = req.params.id;
	db.product.remove({_id: _id},(err, doc) => {
		res.status(200).send();
	}).catch(err => {
		console.error(err);
		res.status(500).send({msg:'Server Error'});
	});
});



module.exports = router;
