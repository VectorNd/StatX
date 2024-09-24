const Company = require('../models'); 

// Function to create a new company entry
async function createCompany(companyData) {
    try {
        const company = new Company(companyData);
        const savedCompany = await company.save();
        return savedCompany;
    } catch (err) {
        throw new Error(`Error creating company: ${err.message}`);
    }
}

async function createCompanies(companies) {
    try {
        const value = await Company.insertMany(companies);
        return value;
    } catch (err) {
        throw new Error(`Error creating company: ${err.message}`);
    }
}

// Function to find companies 

async function findCompaniesByNameOrCode(input) {
    try {

        // Search for companies with names or codes that match the input (case-insensitive)
        const companies = await Company.find({
            $or: [
                { name: { $regex: input, $options: 'i' } }, // Case-insensitive match on name
                { companyCode: { $regex: input, $options: 'i' } } // Case-insensitive match on company code
            ]
        });
        return companies;
    } catch (err) {
        throw new Error(`Error finding companies by name or code: ${err.message}`);
    }
}


async function findCompaniesByCountry(country) {
    try {
        const companies = await Company.find({ country: country });
        if (!companies) {
            throw new Error(`Companies with country ${country} not found`);
        }
        return companies;
    } catch (err) {
        throw new Error(`Error finding company: ${err.message}`);
    }
}



async function findCompanyByCode(companyCode) {
    try {
        const company = await Company.findOne({ companyCode });
        if (!company) {
            throw new Error(`Company with code ${companyCode} not found`);
        }
        return company;
    } catch (err) {
        throw new Error(`Error finding company: ${err.message}`);
    }
}


async function findAllCompanies(filter = {}, sort = { createdAt: -1 }) {
    try {
        const companies = await Company.find(filter).sort(sort);
        return companies;
    } catch (err) {
        throw new Error(`Error finding companies: ${err.message}`);
    }
}


async function findCompaniesWithGreaterStockPrice(stockPrice) {
    try {
        const companies = await Company.find({ stockPrice: { $gt: stockPrice } });
        return companies;
    } catch (err) {
        throw new Error(`Error finding companies with greater stock price: ${err.message}`);
    }
}


// Function to count companies 

async function countCompaniesWithGreaterMarketShare(latestMarketShare) {
    try {
        const count = await Company.countDocuments({ 'marketShares.share': { $gt: latestMarketShare } });
        return count;
    } catch (err) {
        throw new Error(`Error counting companies with greater market share: ${err.message}`);
    }
}


async function countCompaniesWithGreaterStockPrice(latestStockPrice) {
    try {
        const count = await Company.countDocuments({ 'stockPrices.price': { $gt: latestStockPrice } });
        return count;
    } catch (err) {
        throw new Error(`Error counting companies with greater stock price: ${err.message}`);
    }
}


// Function to update a company 

async function updateCompanyByCode(companyCode, updateData) {
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { companyCode },
            { $set: updateData },
            { new: true, runValidators: true }
        );
        if (!updatedCompany) {
            throw new Error(`Company with code ${companyCode} not found`);
        }
        return updatedCompany;
    } catch (err) {
        throw new Error(`Error updating company: ${err.message}`);
    }
}

// Function to delete a company 

async function deleteCompanyByCode(companyCode) {
    try {
        const deletedCompany = await Company.findOneAndDelete({ companyCode });
        if (!deletedCompany) {
            throw new Error(`Company with code ${companyCode} not found`);
        }
        return deletedCompany;
    } catch (err) {
        throw new Error(`Error deleting company: ${err.message}`);
    }
}


// Export the functions to be used in the service layer
module.exports = {
    createCompany,
    createCompanies,
    findCompaniesByNameOrCode,
    findCompaniesByCountry,
    findCompanyByCode,
    countCompaniesWithGreaterMarketShare,
    countCompaniesWithGreaterStockPrice,
    findAllCompanies,
    updateCompanyByCode,
    deleteCompanyByCode,
    findCompaniesWithGreaterStockPrice,
};
