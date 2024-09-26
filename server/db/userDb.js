const { User } = require('../models'); 

// Function to create a new user entry
async function createUserByGoogle( username, email, googleId ) {
    try {
        const user = new User({
            username: username,
            email: email,
            googleId: googleId,
            isVerified: true
        });
        await user.save();
        return User;
    } catch (err) {
        throw new Error(`Error finding User: ${err.message}`);
    }
}

async function createUserByGitHub( username, email, githubId ) {
    try {
        const user = new User({
            username: username,
            email: email,
            githubId: githubId,
            isVerified: true
        });
        await user.save();
        return User;
    } catch (err) {
        throw new Error(`Error finding User: ${err.message}`);
    }
}

// Function to find user

async function findUser(id) {
    try {
        const user = await User.findById(id);
        return user;
    } catch (err) {
        throw new Error(`Error finding User: ${err.message}`);
    }
}

async function findUserByGoogle(googleId) {
    try {
        const user = await User.findOne({ googleId: googleId });
        return user;
    } catch (err) {
        throw new Error(`Error finding User: ${err.message}`);
    }
}

async function findUserByGitHub(githubId) {
    try {
        const user = await User.findOne({ githubId: githubId });
        return user;
    } catch (err) {
        throw new Error(`Error finding User: ${err.message}`);
    }
}

async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (err) {
        throw new Error(`Error finding User: ${err.message}`);
    }
}

// Export the functions to be used in the service layer
module.exports = {
    createUserByGoogle,
    createUserByGitHub,
    findUser,
    findUserByEmail,
    findUserByGitHub,
    findUserByGoogle,
};
