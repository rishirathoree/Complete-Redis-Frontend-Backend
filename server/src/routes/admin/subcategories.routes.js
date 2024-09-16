'use strict';
const { Router } = require("express");
const uploads = require("../../config/multer.config");
const { CreateSubCategories, GetSubCategories } = require("../../controllers/admin/subcategories.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");

const router = Router();

router
.post("/",VerifyTokenCRM,uploads.single('image'),CreateSubCategories)
.get("/",VerifyTokenCRM,GetSubCategories)
// define

module.exports = router;

