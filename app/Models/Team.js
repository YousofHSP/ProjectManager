const mongoose = require('mongoose');
const { User } = require('./User');

const TeamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    username: {type:String, required: true, unique: true},
    users: {type: [mongoose.Types.ObjectId], default: [], ref: User},
    owner: {type: mongoose.Types.ObjectId, required: true, ref: User},
}, {
    timestamps: true
});

const Team = mongoose.model('team', TeamSchema);

module.exports = {
    Team
}