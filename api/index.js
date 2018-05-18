const menu = require('./menu.js');
const picture = require('./picture.js');
const product = require('./product.js');


module.exports = (app) => {
	app.use(menu);
	app.use(picture);
	app.use(product);
};
