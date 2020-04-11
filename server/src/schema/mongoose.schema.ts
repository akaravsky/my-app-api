const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    likes: Number
});

module.exports = mongoose.model('user', UserSchema);