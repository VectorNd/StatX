const express = require("express");
const { CompanyController } = require("../../controllers");
const router = express.Router();
const { AuthMiddleware, CacheMiddleware } = require('../../middleware')

router.post('/searchCompanies', CacheMiddleware.cacheMiddlewareSearch, AuthMiddleware.checkUserAuth, CompanyController.searchCompanies);
router.post('/compute', CacheMiddleware.cacheMiddlewareSearch, AuthMiddleware.checkUserAuth, CompanyController.compute);
router.post('/historyCompute', CacheMiddleware.cacheMiddlewareHistory, AuthMiddleware.checkUserAuth,  CompanyController.historyCompute);
router.post('/addCompanies', CompanyController.addCompaniesFromCsv);
router.post('/deleteCompanies', CompanyController.deleteCompanies);


module.exports = router;