const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    country: { type: String, required: true },
    diversityScore: { type: Number, required: true },
    stockPrices: [{ year: Number, price: Number }],
    marketShares: [{ year: Number, share: Number }],
    revenues: [{ year: Number, revenue: Number }],
    expenses: [{ year: Number, expense: Number }],
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;