'use strict';
const { Router } = require("express");
const uploads = require("../../config/multer.config");
const { CreateBreed, GetBreed } = require("../../controllers/admin/breeds.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");

const router = Router();

router
.post("/",VerifyTokenCRM,uploads.single('image'),CreateBreed)
.get("/",VerifyTokenCRM,GetBreed)
// define

module.exports = router;

