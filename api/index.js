const menu = require('./menu.js')
const picture = require('./picture.js')
//const multer = require('multer');

module.exports = (app) => {
	app.use(menu)
	app.use(picture)
}