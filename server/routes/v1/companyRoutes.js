const express = require("express");
const { CompanyController } = require("../../controllers");
const router = express.Router();
const { AuthMiddleware } = require('../../middleware')

router.post('/searchCompanies', CompanyController.searchCompanies);
router.post('/compute', CompanyController.compute);
router.post('/addCompanies', CompanyController.addCompaniesFromCsv);
router.post('/deleteCompanies', CompanyController.deleteCompanies);


module.exports = router;