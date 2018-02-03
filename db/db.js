const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
	title: String,
	href: String
})

const MenuSchema = new Schema({
	title: String,
	href: String,
	date: Date,
	group: [MenuItemSchema]

})

const Models = {
	menu: mongoose.model('menu', MenuSchema)
}

//初始化数据
const initialize = () => {
	console.log('initialize data')
}
mongoose.set('bufferCommands', false);
mongoose.connect('mongodb://localhost/cherrypieDb')
const db = mongoose.connection
db.on('error', console.error.bind(console,'Database connection error.'))

db.once('open', () => {
	console.log('The database has connected.')
	//initialize()
})

module.exports = Models;