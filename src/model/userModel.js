const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
        unique: true,
    },
    customerPassword: {
        type: String,
        required: true,
    },
    customerDateOfBirth: {
        type: Date,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
