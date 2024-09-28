const { CompanyDb } = require("../db");
const fs = require("fs");
const csv = require("csv-parser");

const computeGrowthStability = (company) => {
  // Calculate growth and stability based on revenue, stock price trends

  const growth = company.revenues
    .map((r) => r.revenue)
    .reduce((acc, curr, idx, arr) => {
      if (idx === 0) return acc;
      return acc + (curr - arr[idx - 1]) / arr[idx - 1];
    }, 0);
  return growth >= 0 ? "Stable" : "Unstable";
};

const predictNextYear = (company) => {
  // Example simplistic prediction logic (ML model could be used here)

  const lastRevenue = company.revenues.slice(-1)[0].revenue;
  const predictedRevenue = lastRevenue * 1.05; // Assuming 5% growth

  return {
    predictedRevenue,
    predictedStockPrice: company.stockPrices.slice(-1)[0].price * 1.03, // 3% increase
    predictedMarketShare: company.marketShares.slice(-1)[0].share * 1.02, // 2% increase
    predictedExpense: company.expenses.slice(-1)[0].expense * 1.04, // 4% increase
  };
};

function parseValue(value) {
  // Remove any non-numeric characters (except for decimal points)
  if (typeof value === 'string') {
      // Check for 'n/a' or similar cases and return 0
      if (value.trim().toLowerCase() === 'n/a' || value.trim() === '') {
          return 0;
      }
      // Remove currency symbols and commas
      const cleanedValue = value.replace(/[\$B,]/g, '').trim();
      const parsedValue = parseFloat(cleanedValue);
      return isNaN(parsedValue) ? 0 : parsedValue; // Default to 0 if NaN
  }
  return 0; // Default for non-string values
}

async function searchCompanies(input) {
  try {
    const companies = await CompanyDb.findCompaniesByNameOrCode(input);
    return companies;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function findByCompanyCode(companyCode) {
  try {
    const company = await CompanyDb.findCompanyByCode(companyCode);
    return company;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function findByCountry(country) {
  try {
    const companies = await CompanyDb.findCompaniesByCountry(country);
    return companies;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function countCompaniesWithGreaterMarketShare(company) {
  try {
    const latestMarketShare = company.marketShares.slice(-1)[0].share;
    const count = await CompanyDb.countCompaniesWithGreaterMarketShare(
      latestMarketShare
    );
    return count;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function countCompaniesWithGreaterStockPrice(company) {
  try {
    const latestStockPrice = company.stockPrices.slice(-1)[0].price;
    const count = await CompanyDb.countCompaniesWithGreaterStockPrice(
      latestStockPrice
    );
    return count;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function countCompaniesWithGreaterRevenue(company) {
  try {
    const latestRevenue = company.revenues.slice(-1)[0].revenue;
    const count = await CompanyDb.countCompaniesWithGreaterRevenue(
      latestRevenue
    );
    return count;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function countCompaniesWithGreaterExpense(company) {
  try {
    const latestExpense = company.expenses.slice(-1)[0].expense;
    const count = await CompanyDb.countCompaniesWithGreaterExpense(
      latestExpense
    );
    return count;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function addCompaniesFromCsv(filePath) {
  try {
    const companies = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          // Parse stock prices, expenses, revenues, and market shares
          const stockPrices = [];
          const marketShares = [];
          const revenues = [];
          const expenses = [];

          for (let year = 2015; year <= 2024; year++) {
            stockPrices.push({
              year: year,
              price: parseValue(row[`Stock Price (${year})`]) || 0,
            });
            marketShares.push({
              year: year,
              share: parseFloat(row[`Market share (${year})`]) || 0,
            });
            revenues.push({
              year: year,
              revenue: parseValue(row[`Revenue (${year})`]) || 0,
            });
            expenses.push({
              year: year,
              expense: parseValue(row[`Expense (${year})`]) || 0,
            });
          }

          // Create a company object
          companies.push({
            name: row["Company"],
            code: row["Country Code"], 
            country: row["Country"],
            diversityScore: parseFloat(row["Diversity"]) || 0,
            stockPrices: stockPrices,
            marketShares: marketShares,
            revenues: revenues,
            expenses: expenses,
          });
        })
        .on("end", async () => {
          try {
            await CompanyDb.createCompanies(companies); 
            console.log("Companies imported successfully");
            resolve(companies.length); // Return the count of inserted companies
          } catch (err) {
            console.error("Error importing companies:", err);
            reject(err); // Reject the promise with the error
          }
        })
        .on("error", (err) => {
          console.error("Error reading CSV file:", err);
          reject(err); // Reject the promise if there's an error reading the file
        });
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function deleteCompanies() {
  try {
    const count = await CompanyDb.deleteCompanies();
    return count;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  computeGrowthStability,
  predictNextYear,
  addCompaniesFromCsv,
  searchCompanies,
  findByCompanyCode,
  findByCountry,
  countCompaniesWithGreaterMarketShare,
  countCompaniesWithGreaterStockPrice,
  countCompaniesWithGreaterRevenue,
  countCompaniesWithGreaterExpense,
  deleteCompanies,
};
