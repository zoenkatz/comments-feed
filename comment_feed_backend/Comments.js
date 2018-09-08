//import dependency
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of database entries.
var CommentsSchema = new Schema({
    id: String,
    timestamp: String,
    message: String,
    email: String
});
//export our module to use in server.js
module.exports = mongoose.model('Comments', CommentsSchema);