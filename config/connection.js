const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/social_network_DB");

module.exports = mongoose.connection;
