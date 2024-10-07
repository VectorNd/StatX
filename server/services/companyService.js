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
  // Check if the input is a string
  if (typeof value === 'string') {
      // Check for 'n/a' or empty strings and return 0
      if (value.trim().toLowerCase() === 'n/a' || value.trim() === '') {
          return 0;
      }

      // Remove currency symbols and commas
      const cleanedValue = value.replace(/[\$B,]/g, '').trim();

      // Determine the multiplier based on the last character
      let multiplier = 1; // Default multiplier
      if (cleanedValue.endsWith('K')) {
          multiplier = 1000; // Thousands
      } else if (cleanedValue.endsWith('M')) {
          multiplier = 1000000; // Millions
      } else if (cleanedValue.endsWith('B')) {
          multiplier = 1000000000; // Billions
      }

      // Remove suffix and trim the string
      const numericValue = cleanedValue.replace(/[KMB]$/, '').trim();

      // Parse the numeric value and multiply by the appropriate multiplier
      const parsedValue = parseFloat(numericValue) * multiplier;

      // Return the parsed value or 0 if NaN
      console.log(parsedValue)
      return isNaN(parsedValue) ? 0 : parsedValue; 
  }
  
  // Default return for non-string values
  return 0;
}

parseValue('$53.17M')

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


async function findCompany(id) {
  try {
    const company = await CompanyDb.findCompany(id);
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
    const avgMarketShare = company.averages.marketShare;
    const count = await CompanyDb.countCompaniesWithGreaterMarketShare(
      avgMarketShare
    );
    return count;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function countCompaniesWithGreaterStockPrice(company) {
  try {
    const avgStockPrice = company.averages.stockPrice;
    const count = await CompanyDb.countCompaniesWithGreaterStockPrice(
      avgStockPrice
    );
    return count;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function countCompaniesWithGreaterRevenue(company) {
  try {
    const avgRevenue = company.averages.revenue;
    const count = await CompanyDb.countCompaniesWithGreaterRevenue(
      avgRevenue
    );
    return count;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function countCompaniesWithGreaterExpense(company) {
  try {
    const avgExpense = company.averages.expense;
    const count = await CompanyDb.countCompaniesWithGreaterExpense(
      avgExpense
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

          for (let year = 2015; year <= 2025; year++) {
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

          const totalMetrics = {
            stockPrice: 0,
            marketShare: 0,
            revenue: 0,
            expense: 0,
          };

          let countStock = 0;
          let countMarket = 0;
          let countRevenue = 0;
          let countExpense = 0;

          stockPrices.map((data) => {
            if (data.price > 0 && data.year < 2025) {
              totalMetrics.stockPrice += data.price;
              countStock++;
            } 
          });
          marketShares.map((data) => {
            if (data.share > 0 && data.year < 2025) {
              totalMetrics.marketShare += data.share;
              countMarket++;
            }
          });
          revenues.map((data) => {
            if (data.revenue > 0 && data.year < 2025) {
              totalMetrics.revenue += data.revenue;
              countRevenue++;
            }
          });
          expenses.map((data) => {
            if (data.expense > 0 && data.year < 2025) {
              totalMetrics.expense += data.expense;
              countExpense++;
            }
          });


          const averages = {
            stockPrice: (totalMetrics.stockPrice / countStock),
            marketShare: (totalMetrics.marketShare / countMarket),
            revenue: (totalMetrics.revenue / countRevenue),
            expense: (totalMetrics.expense / countExpense),
          };


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
            averages: averages,
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
  findCompany,
  countCompaniesWithGreaterMarketShare,
  countCompaniesWithGreaterStockPrice,
  countCompaniesWithGreaterRevenue,
  countCompaniesWithGreaterExpense,
  deleteCompanies,
};
