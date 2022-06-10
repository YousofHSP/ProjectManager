const mongoose = require('mongoose');
const InviteRequest = new mongoose.Schema({
    teamID: {type: mongoose.Types.ObjectId, required: true},
    caller: {type: String, required: true},
    requestDate: {type: Date, default: Date.now()},
    status: {type: String, default: 'pending'} // pending | accepted | rejected
})
const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String, required: true, unique: true},
    mobile: {type: String, required: true, unique: true},
    roles: {type: [String], default: ['USER']},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    skills: {type: [String], default: []},
    teams: {type: [mongoose.Types.ObjectId], default: []},
    token: {type: String, default: ""},
    image: {type: String, default: "/defaults/default.png"},
    inviteRequests: {type: [InviteRequest]}
}, {
    timestamps: true
});

const User = mongoose.model('user', UserSchema);

module.exports = {
    User
}