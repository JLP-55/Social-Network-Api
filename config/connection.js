const mongoose = require("mongoose");

// mongoose connection to the local server
mongoose.connect("mongodb://127.0.0.1:2717/aggragateDB");

// export connection
module.exports = mongoose.connection