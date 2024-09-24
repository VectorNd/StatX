const { CompanyService } = require("../services");

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

    // Find the company based on the ID

    const company = await CompanyService.findByCompanyCode(companyCode);
    if (!company) return res.status(404).json({ status: "FAILED", data: "Company not found" });

    // Fetch other companies in the same country

    const sameCountryCompanies = await CompanyService.findByCountry(
      company.country
    );

    // Simulate the computation

    const startTime = Date.now();

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
      growthStability: CompanyService.computeGrowthStability(company), // Some helper function you write
      predictions: CompanyService.predictNextYear(company), // Some ML/logic to predict based on past data
    };

    // Enforce 2-minute response time

    const responseTime = Date.now() - startTime;
    const waitTime = Math.max(120000 - responseTime, 0); // Wait for at least 2 minutes (120000 ms)

    setTimeout(() => {
        return res.status(200).json({ status: "SUCCESS", data: { metrics: metrics, actualProcessingTime: responseTime } });
    }, waitTime);

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}


async function addCompaniesFromCsv(req, res) {
  try {
    const filePath = "../Mock Data Prepathon.csv";
    const val = await CompanyService.addCompaniesFromCsv(filePath);

    return res.status(200).json({ status: "SUCCESS", data: val });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

module.exports = { searchCompanies, compute, addCompaniesFromCsv };
