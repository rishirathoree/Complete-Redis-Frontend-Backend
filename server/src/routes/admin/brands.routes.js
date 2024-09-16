'use strict';
const { Router } = require("express");
const uploads = require("../../config/multer.config");
const { CreateBrands, GetBrands } = require("../../controllers/admin/brands.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");

const router = Router();

router
.post("/",uploads.single('image'),CreateBrands)
.get("/",VerifyTokenCRM,GetBrands)
// define

module.exports = router;

