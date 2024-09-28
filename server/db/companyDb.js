const { Company } = require('../models'); 
const levenshtein = require('fast-levenshtein');

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


// Function to delete company entry
async function deleteCompany(id) {
    try {
        const company =  await Company.deleteOne({ _id: id });
        return company;
    } catch (err) {
        throw new Error(`Error deleting company: ${err.message}`);
    }
}

async function deleteCompanies() {
    try {
        const value = await Company.deleteMany({});
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
                { name: { $regex: input, $options: 'i' } },
                { code: { $regex: input, $options: 'i' } }
            ]
        });
    
        // Step 2: Calculate Levenshtein distance and sort companies
        const companiesWithScores = companies.map(company => {
            const nameDistance = levenshtein.get(company.name.toLowerCase(), input.toLowerCase());
            const codeDistance = levenshtein.get(company.code.toLowerCase(), input.toLowerCase());
            
            // Combine the distances into a score
            const score = Math.min(nameDistance, codeDistance);
            
            return { ...company.toObject(), score }; // Include score in the result
        });
    
        // Step 3: Sort by score (lower is better)
        companiesWithScores.sort((a, b) => a.score - b.score);
        
        
        return companiesWithScores;
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
        const company = await Company.findOne({ code: companyCode });
        if (!company) {
            throw new Error(`Company with code ${companyCode} not found`);
        }
        return company;
    } catch (err) {
        throw new Error(`Error finding company: ${err.message}`);
    }
}

async function findCompany(id) {
    try {
        const company = await Company.findOne({ _id: id });
        if (!company) {
            throw new Error(`Company with ${id} not found`);
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
        const companies = await Company.find({ 'averages.stockPrice': { $gt: stockPrice } });
        return companies;
    } catch (err) {
        throw new Error(`Error finding companies with greater stock price: ${err.message}`);
    }
}


// Function to count companies 

async function countCompaniesWithGreaterMarketShare(avgMarketShare) {
    try {
        const count = await Company.countDocuments({ 'averages.marketShare': { $gt: avgMarketShare } });
        return count;
    } catch (err) {
        throw new Error(`Error counting companies with greater market share: ${err.message}`);
    }
}


async function countCompaniesWithGreaterStockPrice(avgStockPrice) {
    try {
        const count = await Company.countDocuments({ 'averages.stockPrice': { $gt: avgStockPrice } });
        return count;
    } catch (err) {
        throw new Error(`Error counting companies with greater stock price: ${err.message}`);
    }
}

async function countCompaniesWithGreaterRevenue(avgRevenue) {
    try {
        const count = await Company.countDocuments({ 'averages.revenue': { $gt: avgRevenue } });
        return count;
    } catch (err) {
        throw new Error(`Error counting companies with greater revenue: ${err.message}`);
    }
}

async function countCompaniesWithGreaterExpense(avgExpense) {
    try {
        const count = await Company.countDocuments({ 'averages.expense': { $gt: avgExpense } });
        return count;
    } catch (err) {
        throw new Error(`Error counting companies with greater expense: ${err.message}`);
    }
}


// Function to update a company 

async function updateCompanyByCode(companyCode, updateData) {
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { code: companyCode },
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
        const deletedCompany = await Company.findOneAndDelete({ code: companyCode });
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
    findCompany,
    countCompaniesWithGreaterMarketShare,
    countCompaniesWithGreaterStockPrice,
    countCompaniesWithGreaterExpense,
    countCompaniesWithGreaterRevenue,
    findAllCompanies,
    updateCompanyByCode,
    deleteCompanyByCode,
    findCompaniesWithGreaterStockPrice,
    deleteCompanies,
    deleteCompany,
};
