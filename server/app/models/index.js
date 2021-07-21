const mongoose = require('mongoose')
mongoose.promise = global.promise

const db = {}

db.mongoose = mongoose
db.user = require('./user.model')
db.url = require('./url.model')

module.exports = db;