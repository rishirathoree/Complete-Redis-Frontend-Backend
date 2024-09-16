'use strict';
const uploads = require("../../config/multer.config");
const { Router } = require("express");
const { CreateProducts, GetProducts } = require("../../controllers/admin/products.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");
const router = Router();

router
.post("/",VerifyTokenCRM,uploads.array('images',8),CreateProducts)
.get("/",VerifyTokenCRM,GetProducts)
// define

module.exports = router;

