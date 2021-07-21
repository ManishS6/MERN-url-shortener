const mongoose = require('mongoose')

// Model for URL shortening
const Url = mongoose.model(
    "Url", 
    new mongoose.Schema({
        complete_url: String,
        short_url: String
    })
)

module.exports = Url