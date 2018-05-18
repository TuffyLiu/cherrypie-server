const express = require('express');
const router = express.Router();
const db = require('../db/db.js');
const multer = require('multer');
const upload = multer().any();
// save picture
router.post('/api/picture', upload, (req, res) => {
	let file = req.files[0];
	const  _id = 'picture' + new Date().getTime();
	file._id = _id;
	file.timestamp = Date();
    new db.picture(file).save().then(() => {
        res.status(200).send({_id: _id});
    }).catch(err => {
    	console.error(err);
    	res.status(500).send({code:500});
    });
});

// get picture by id
router.get('/api/picture/:id', (req, res) => {
	const _id = req.params.id;
	db.picture.find({_id: _id},(err, doc) => {
		if (err) {
			console.error(err);
			res.status(500).send({code:500});
		} else {
			console.error(doc);
			doc = doc[0];
			res.header('Access-Control-Allow-Origin', '*');
		    res.writeHead(200, {'Content-Type': doc.mimetype });
		    res.end(doc.buffer, 'binary');
		}
	});
});
// delete picture by id
router.delete('/api/picture/:id', (req, res) => {
	const _id = req.params.id;
	db.picture.remove({_id: _id},(err, doc) => {
		if (err) {
			console.error(err);
			res.status(500).send({code:500});
		} else {
			res.status(200).send();
		}
	});
});

module.exports = router;
