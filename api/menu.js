const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

// get all menu list
router.get('/api/menus', (req, res) => {
	db.menu.find({},(err, doc) => {
		if (err) {
			res.status(500).send(doc)
		} else {
			res.status(200).send(doc)
		}
	})
})

// update one menu
router.patch('/api/menu/:id', (req, res) => {
	let _id = req.params.id
    let menu = {
        title: req.body.title,
        href: req.body.href,
        date: Date(),
        group: req.body.group
    }
	db.menu.update({_id: _id}, menu, (err, data) => {
        if (err) {
            res.status(500).send({code:-1})
        } else {
			res.status(200).send({code:1})
        }
    })
})

// insert one menu

router.post('/api/menu', (req, res) => {
	let menu = {
        title: req.body.title,
        href: req.body.href,
        date: Date(),
        group: req.body.group
    }
    new db.menu(menu).save().then(() => {
        res.status(200).send({code:1})
    }).catch(err => { 
    	res.status(500).send({code:-1})
    })

})

module.exports = router