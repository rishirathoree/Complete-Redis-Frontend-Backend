'use strict';
const { Router } = require("express");
const uploads = require("../../config/multer.config");
const { CreateCategories, GetCategories } = require("../../controllers/admin/categories.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");

const router = Router();

router
.post("/",VerifyTokenCRM,uploads.single('image'),CreateCategories)
.get("/",VerifyTokenCRM,GetCategories)
// define

module.exports = router;

