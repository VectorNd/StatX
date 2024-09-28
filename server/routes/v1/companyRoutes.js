const express = require("express");
const { CompanyController } = require("../../controllers");
const router = express.Router();
const { AuthMiddleware } = require('../../middleware')

router.post('/searchCompanies', AuthMiddleware.checkUserAuth, CompanyController.searchCompanies);
router.post('/compute', AuthMiddleware.checkUserAuth, CompanyController.compute);
router.post('/historyCompute', AuthMiddleware.checkUserAuth, CompanyController.historyCompute);
router.post('/addCompanies', CompanyController.addCompaniesFromCsv);
router.post('/deleteCompanies', CompanyController.deleteCompanies);


module.exports = router;