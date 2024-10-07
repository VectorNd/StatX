const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, sparse: true },
    githubId: { type: String, sparse: true },
    isVerified: { type: Boolean, default: false },
    secret2FA: { type: String },
    recoveryCodes: [{ type: String }],
    companyMetrics: [{
        companyCode: { type: String },
        name: { type: String },
        country: { type: String },
        metrics: {
            id: { type: String },
            name: { type: String },
            country: { type: String },
            totalCompaniesInCountry: { type: Number },
            greaterDiversity: { type: Number },
            stockPriceComparison: {
                domestic: { type: Number },
                global: { type: Number }
            },
            marketShareComparison: {
                domestic: { type: Number },
                global: { type: Number }
            },
            revenueComparison: {
                domestic: { type: Number },
                global: { type: Number }
            },
            expenseComparison: {
                domestic: { type: Number },
                global: { type: Number }
            },
            yearlyChanges: {
                stockPriceChange: { type: Object },
                marketShareChange: { type: Object },
                revenueChange: { type: Object },
                expenseChange: { type: Object },
            },
            predictions: { 
                stockPricePrediction: { type: Object },
                marketSharePrediction: { type: Object },
                revenuePrediction: { type: Object },
                expensePrediction: { type: Object },
            },
        },
        searchedAt: { type: String }
    }]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;