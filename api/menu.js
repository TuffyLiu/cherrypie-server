const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

router.get('/api/menu', (req, res) => {
	console.log();
	db.menu.findOne((error, result) => { 
		
		}
	);
	db.menu.find({},(err, doc) => {
		if (err) {
			console.error(err)
		} else {
			console.log(doc)
			res.status(200).send('succeed in saving new passage.')
		}
	})
})

module.exports = router