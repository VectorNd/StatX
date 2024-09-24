const { CompanyDb } = require("../db");

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

module.exports = {
  computeGrowthStability,
  predictNextYear,
  searchCompanies,
  findByCompanyCode,
  findByCountry,
  countCompaniesWithGreaterMarketShare,
  countCompaniesWithGreaterStockPrice,
};
