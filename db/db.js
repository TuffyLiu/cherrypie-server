const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
	title: String,
	href: String
});

const MenuSchema = new Schema({
	title: String,
	href: String,
	date: Date,
	group: [MenuItemSchema]

});


const PictureSchema =  new Schema({
	_id: String,
	timestamp: Date,
	fieldname: String,
	originalname: String,
	encoding: String,
	mimetype: String,
	buffer: Buffer,
	size: Number
});

const ProductDetailSchema = new Schema({
	label: String,
	value: String
});

const ProductSchema =  new Schema({
	_id: String,
	timestamp: Date,
	updateTime: Date,
	picture: Array,
	sku: String,
	title: String,
	description: String,
	price: Number,
	currency: String,
	occasion: Array,
	details: [ProductDetailSchema]
});


const Models = {
	menu: mongoose.model('menu', MenuSchema),
	picture: mongoose.model('picture', PictureSchema),
	product: mongoose.model('product', ProductSchema)
};

//初始化数据
const initialize = () => {
	console.log('initialize data');
};
mongoose.set('bufferCommands', false);
mongoose.connect('mongodb://localhost:27018/cherrypieDb');
const db = mongoose.connection;
db.on('error', console.error.bind(console,'Database connection error.'));

db.once('open', () => {
	console.log('The database has connected.');
	//initialize()
});

module.exports = Models;
