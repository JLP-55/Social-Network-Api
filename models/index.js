const User = require("./userModel.js");
const Thoughts = require("./thoughtModel.js");

// User will not currently work being destructured. Not sure why?
// new note - you have to specify the exact path to the model in the controllers
module.exports = {User, Thoughts};
