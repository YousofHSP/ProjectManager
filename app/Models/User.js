const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String, required: true, unique: true},
    mobile: {type: String, required: true, unique: true},
    roles: {type: [String], default: ['USER']},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    skills: {type: [String], default: []},
    teams: {type: [mongoose.Types.ObjectId], default: []},
    token: {type: String, default: ""},
    image: {type: String, default: "/defaults/default.png"}
}, {
    timestamps: true
});

const User = mongoose.model('user', UserSchema);

module.exports = {
    User
}