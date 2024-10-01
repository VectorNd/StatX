const express = require("express");
const { CompanyController } = require("../../controllers");
const router = express.Router();
const { AuthMiddleware, CacheMiddleware } = require('../../middleware')

router.post('/searchCompanies', AuthMiddleware.checkUserAuth, CacheMiddleware.cacheMiddlewareSearch, CompanyController.searchCompanies);
router.post('/compute', AuthMiddleware.checkUserAuth, CacheMiddleware.cacheMiddlewareSearch, CompanyController.compute);
router.post('/historyCompute', AuthMiddleware.checkUserAuth,  CompanyController.historyCompute);
router.post('/addCompanies', CompanyController.addCompaniesFromCsv);
router.post('/deleteCompanies', CompanyController.deleteCompanies);


module.exports = router;