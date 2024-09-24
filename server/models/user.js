const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, sparse: true },
    githubId: { type: String, sparse: true },
    isVerified: { type: Boolean, default: false },
    secret2FA: { type: String }, // Secret for 2FA
    recoveryCodes: [{ type: String }],

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;