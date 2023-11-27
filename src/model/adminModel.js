const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        default:new mongoose.Types.ObjectId()._id
      },
    adminEmail: {
        type: String,
        required: true,
    },
    adminPassword:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('Admin', userSchema);

module.exports = User;
