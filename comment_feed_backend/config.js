
exports.port = process.env.PORT || 3001;
exports.origin = process.env.ORIGIN || `http://localhost:${exports.port}`;

//db config
const mongoose = require('mongoose');
mongoose.connect('mongodb://zoek6:bisli111@ds249372.mlab.com:49372/comment-feed');