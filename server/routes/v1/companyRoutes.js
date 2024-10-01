const express = require("express");
const { CompanyController } = require("../../controllers");
const router = express.Router();
const { AuthMiddleware, CacheMiddleware } = require('../../middleware')

router.post('/searchCompanies', AuthMiddleware.checkUserAuth, CacheMiddleware.cacheMiddleware, CompanyController.searchCompanies);
router.post('/compute', AuthMiddleware.checkUserAuth, CacheMiddleware.cacheMiddleware, CompanyController.compute);
router.post('/historyCompute', AuthMiddleware.checkUserAuth, CacheMiddleware.cacheMiddleware, CompanyController.historyCompute);
router.post('/addCompanies', CompanyController.addCompaniesFromCsv);
router.post('/deleteCompanies', CompanyController.deleteCompanies);


module.exports = router;