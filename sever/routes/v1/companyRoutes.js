const express = require("express");
const { CompanyController } = require("../../controllers");
const router = express.Router();
const { AuthMiddleware } = require('../../middleware')



router.post('/searchCompanies', AuthMiddleware.checkUserAuth, CompanyController.searchCompanies);
router.post('/compute', AuthMiddleware.checkUserAuth, CompanyController.compute)



module.exports = router;