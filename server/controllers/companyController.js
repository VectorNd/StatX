const { CompanyService, UserService } = require("../services");

async function searchCompanies(req, res) {
  try {
    const { input } = req.body;
    const companies = await CompanyService.searchCompanies(input);
    return res.status(200).json({ status: "SUCCESS", data: companies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

async function compute(req, res) {
  try {
    const { companyCode } = req.body;
    // const user = await UserService.findUser(req.userId);

    // if (!user) {
    //   return res.status(404).json({ status: "FAILED", data: "User not found" });
    // }

    // const existingMetricsIndex = user.companyMetrics.findIndex(
    //   (entry) => entry.companyCode === companyCode
    // );

    // if (existingMetricsIndex !== -1) {
    //   const metric = user.companyMetrics[existingMetricsIndex].metrics;
    //   return res.status(200).json({ status: "SUCCESS", data: { metrics: metric } });
    // } 

    // Find the company based on the ID

    const company = await CompanyService.findByCompanyCode(companyCode);
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
    
      const initialStockPrice = 100; // Assume the initial stock price is 100%
      const initialMarketShare = 100; // Assume the initial market share is 100%
      const initialRevenue = 100; // Assume the initial revenue is 100%
      const initialExpense = 100; // Assume the initial expense is 100%
    
      // Iterate through each year starting from the first year
      for (let i = 0; i < companyData.stockPrices.length; i++) {
        const year = 2015 + i; // Assume starting year is 2015
    
        // Current year metrics
        const stockPriceCurrent = (companyData.stockPrices[i].price / companyData.stockPrices[0].price) * initialStockPrice;
        const marketShareCurrent = (companyData.marketShares[i].share / companyData.marketShares[0].share) * initialMarketShare;
        const revenueCurrent = (companyData.revenues[i].revenue / companyData.revenues[0].revenue) * initialRevenue;
        const expenseCurrent = (companyData.expenses[i].expense / companyData.expenses[0].expense) * initialExpense;
    
        // Calculate percentage change and cap between 0 and 100
        const stockPriceChange = Math.min(100, Math.max(0, (stockPriceCurrent - initialStockPrice) / initialStockPrice * 100));
        const marketShareChange = Math.min(100, Math.max(0, (marketShareCurrent - initialMarketShare) / initialMarketShare * 100));
        const revenueChange = Math.min(100, Math.max(0, (revenueCurrent - initialRevenue) / initialRevenue * 100));
        const expenseChange = Math.min(100, Math.max(0, (expenseCurrent - initialExpense) / initialExpense * 100));
    
        // Store changes
        changes.stockPriceChange.push({ year, change: stockPriceChange });
        changes.marketShareChange.push({ year, change: marketShareChange });
        changes.revenueChange.push({ year, change: revenueChange });
        changes.expenseChange.push({ year, change: expenseChange });
      }
    
      return changes;
    };

    const metrics = {
      totalCompaniesInCountry: sameCountryCompanies.length,
      greaterDiversity: sameCountryCompanies.filter(
        (c) => c.diversityScore > company.diversityScore
      ).length,
      stockPriceComparison: {
        domestic: sameCountryCompanies.filter(
          (c) =>
            c.stockPrices.slice(-1)[0].price >
            company.stockPrices.slice(-1)[0].price
        ).length,
        global: await CompanyService.countCompaniesWithGreaterStockPrice(
          company
        ),
      },
      marketShareComparison: {
        domestic: sameCountryCompanies.filter(
          (c) =>
            c.marketShares.slice(-1)[0].share >
            company.marketShares.slice(-1)[0].share
        ).length,
        global: await CompanyService.countCompaniesWithGreaterMarketShare(
          company
        ),
      },
      revenueComparison: {
        domestic: sameCountryCompanies.filter(
          (c) =>
            c.revenues.slice(-1)[0].revenue >
            company.revenues.slice(-1)[0].revenue
        ).length,
        global: await CompanyService.countCompaniesWithGreaterRevenue(
          company
        ),
      },
      expenseComparison: {
        domestic: sameCountryCompanies.filter(
          (c) =>
            c.expenses.slice(-1)[0].expense >
            company.expenses.slice(-1)[0].expense
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
    
    // user.companyMetrics.push({
    //   companyCode,
    //   name: company.company,
    //   metrics: metrics,
    //   searchedAt: Date.now(),
    // });
    // await user.save();
    const responseTime = Date.now() - startTime;
    const waitTime = Math.max(120000 - responseTime, 0); // Wait for at least 2 minutes (120000 ms)


    // setTimeout(() => {
    // }, waitTime);
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
