const express = require("express");

const router = express.Router();

const CompanyRoutes = require("./companyRoutes");
const UserRoutes = require("./userRoutes");

router.use("/company", CompanyRoutes);
router.use("/user", UserRoutes);

module.exports = router;