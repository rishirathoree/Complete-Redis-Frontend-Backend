'use strict';

const { Router } = require("express");
const uploads = require("../../config/multer.config");
const { CreateManagements, GetManagements, GetLogins } = require("../../controllers/admin/owners.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");
const router = Router();

router
// define
.post("/",uploads.none(),CreateManagements)
.get("/",VerifyTokenCRM,GetManagements)
.post("/in",uploads.none(),GetLogins)

module.exports = router;

