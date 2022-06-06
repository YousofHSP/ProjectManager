const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String, required: true, unique: true},
    mobile: {type: String, required: true, unique: true},
    roles: {type: [String], default: ['USER']},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    skils: {type: [String], default: []},
    teams: {type: [mongoose.Types.ObjectId], default: []},
}, {
    timestamps: true
});

const User = mongoose.model('user', UserSchema);

module.exports = {
    User
}