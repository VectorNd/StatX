const { CompanyService, UserService } = require("../services");
const redisClient = require('../redisClient');

async function searchCompanies(req, res) {
  try {
    const { input } = req.body;
    const companies = await CompanyService.searchCompanies(input);

    let cacheKey = `${req.originalUrl}_${JSON.stringify(req.body)}`;
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(companies)); // Cache for 1 hour
    return res.status(200).json({ status: "SUCCESS", data: companies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

async function compute(req, res) {
  try {
    const { id } = req.body;
    const user = await UserService.findUser(req.userId);

    if (!user) {
      return res.status(404).json({ status: "FAILED", data: "User not found" });
    }

    const existingMetricsIndex = user.companyMetrics.findIndex(
      (entry) => entry.metrics.id === id
    );

    if (existingMetricsIndex !== -1) {
      const metric = user.companyMetrics[existingMetricsIndex].metrics;
      return res.status(200).json({ status: "SUCCESS", data: { metrics: metric } });
    } 

    // Find the company based on the ID

    const company = await CompanyService.findCompany(id);
    if (!company) return res.status(404).json({ status: "FAILED", data: "Company not found" });

    // Fetch other companies in the same country

    const sameCountryCompanies = await CompanyService.findByCountry(
      company.country
    );

    // Simulate the computation

    const startTime = Date.now();

    const calculateYearlyPercentageChanges = (companyData) => {
      const changes = {
        stockPriceChange: [],
        marketShareChange: [],
        revenueChange: [],
        expenseChange: [],
      };
    
      // Find the minimum values for stockPrice, marketShare, revenue, and expense
      const minStockPrice = Math.min(...companyData.stockPrices.map(data => data.price).filter(price => price > 0));
      const minMarketShare = Math.min(...companyData.marketShares.map(data => data.share).filter(share => share > 0));
      const minRevenue = Math.min(...companyData.revenues.map(data => data.revenue).filter(revenue => revenue > 0));
      const minExpense = Math.min(...companyData.expenses.map(data => data.expense).filter(expense => expense > 0));
    
      // Arrays to store raw percentage changes
      const rawChanges = {
        stockPrice: [],
        marketShare: [],
        revenue: [],
        expense: [],
      };
    
      // Iterate through each year
      for (let i = 0; i < companyData.stockPrices.length; i++) {
        const year = 2015 + i; // Assume starting year is 2015
    
        // Current year metrics
        const stockPriceCurrent = companyData.stockPrices[i].price;
        const marketShareCurrent = companyData.marketShares[i].share;
        const revenueCurrent = companyData.revenues[i].revenue;
        const expenseCurrent = companyData.expenses[i].expense;
    
        // Calculate percentage change relative to the minimum value
        const stockPriceChange = ((stockPriceCurrent - minStockPrice) / minStockPrice) * 100;
        const marketShareChange = ((marketShareCurrent - minMarketShare) / minMarketShare) * 100;
        const revenueChange = ((revenueCurrent - minRevenue) / minRevenue) * 100;
        const expenseChange = ((expenseCurrent - minExpense) / minExpense) * 100;
    
        // Store raw changes
        rawChanges.stockPrice.push(stockPriceChange);
        rawChanges.marketShare.push(marketShareChange);
        rawChanges.revenue.push(revenueChange);
        rawChanges.expense.push(expenseChange);
      }
    
      // Find the maximum values to normalize
      const maxStockPriceChange = Math.max(...rawChanges.stockPrice);
      const maxMarketShareChange = Math.max(...rawChanges.marketShare);
      const maxRevenueChange = Math.max(...rawChanges.revenue);
      const maxExpenseChange = Math.max(...rawChanges.expense);
    
      // Normalize the percentage changes to fit within 0-100%
      for (let i = 0; i < companyData.stockPrices.length; i++) {
        const year = 2015 + i;
        // Current year metrics
        const stockPriceCurrent = companyData.stockPrices[i].price;
        const marketShareCurrent = companyData.marketShares[i].share;
        const revenueCurrent = companyData.revenues[i].revenue;
        const expenseCurrent = companyData.expenses[i].expense;
    
        changes.stockPriceChange.push({ year, change: stockPriceCurrent == 0 ? -1 : (rawChanges.stockPrice[i] / maxStockPriceChange) * 100 });
        changes.marketShareChange.push({ year, change: marketShareCurrent == 0 ? -1 : (rawChanges.marketShare[i] / maxMarketShareChange) * 100 });
        changes.revenueChange.push({ year, change: revenueCurrent == 0 ? -1 : (rawChanges.revenue[i] / maxRevenueChange) * 100 });
        changes.expenseChange.push({ year, change: expenseCurrent == 0 ? -1 : (rawChanges.expense[i] / maxExpenseChange) * 100 });
      }
    
      return changes;
    };
    

    const metrics = {
      id: id,
      totalCompaniesInCountry: sameCountryCompanies.length,
      greaterDiversity: sameCountryCompanies.filter(
        (c) => c.diversityScore > company.diversityScore
      ).length,
      stockPriceComparison: {
        domestic: sameCountryCompanies.filter(
          (c) =>
            c.averages.stockPrice >
            company.averages.stockPrice
        ).length,
        global: await CompanyService.countCompaniesWithGreaterStockPrice(
          company
        ),
      },
      marketShareComparison: {
        domestic: sameCountryCompanies.filter(
          (c) =>
            c.averages.marketShare >
            company.averages.marketShare
        ).length,
        global: await CompanyService.countCompaniesWithGreaterMarketShare(
          company
        ),
      },
      revenueComparison: {
        domestic: sameCountryCompanies.filter(
          (c) =>
            c.averages.revenue >
            company.averages.revenue
        ).length,
        global: await CompanyService.countCompaniesWithGreaterRevenue(
          company
        ),
      },
      expenseComparison: {
        domestic: sameCountryCompanies.filter(
          (c) =>
            c.averages.expense >
            company.averages.expense
        ).length,
        global: await CompanyService.countCompaniesWithGreaterExpense(
          company
        ),
      },
      yearlyChanges: calculateYearlyPercentageChanges(company),
      growthStability: CompanyService.computeGrowthStability(company), // Some helper function you write
      predictions: CompanyService.predictNextYear(company), // Some ML/logic to predict based on past data
    };

    // Enforce 2-minute response time
    
    user.companyMetrics.push({
      companyCode: company.code,
      name: company.name,
      metrics: metrics,
      searchedAt: Date.now(),
    });
    await user.save();
    const responseTime = Date.now() - startTime;
    const waitTime = Math.max(120000 - responseTime, 0); // Wait for at least 2 minutes (120000 ms)

    // setTimeout(() => {
    // }, waitTime);


    let cacheKey = `${req.originalUrl}_${JSON.stringify(req.body)}`;
    await redisClient.setEx(cacheKey, 3600, JSON.stringify({ metrics: metrics, actualProcessingTime: responseTime }));

    return res.status(200).json({ status: "SUCCESS", data: { metrics: metrics, actualProcessingTime: responseTime } });


  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}


async function historyCompute(req, res) {
  try {
    const user = await UserService.findUser(req.userId);

    if (!user) {
      return res.status(404).json({ status: "FAILED", data: "User not found" });
    }


    let cacheKey = `${req.originalUrl}_${JSON.stringify(req.body)}`;
    await redisClient.setEx(cacheKey, 3600, JSON.stringify({ metrics: user.companyMetrics }));
    return res.status(200).json({ status: "SUCCESS", data: { metrics: user.companyMetrics }});
    

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

async function addCompaniesFromCsv(req, res) {
  try {
    const filePath = "./Mock Data Prepathon.csv";
    const val = await CompanyService.addCompaniesFromCsv(filePath);

    return res.status(200).json({ status: "SUCCESS", data: val });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}


async function deleteCompanies(req, res) {
  try {
    const val = await CompanyService.deleteCompanies();

    return res.status(200).json({ status: "SUCCESS", data: val });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

module.exports = { searchCompanies, compute, historyCompute, addCompaniesFromCsv, deleteCompanies };
