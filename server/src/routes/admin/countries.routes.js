const { Router } = require("express");
const uploads = require("../../config/multer.config");
const { CreateCountries, GetCountries } = require("../../controllers/admin/countries.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");

const router= Router()

router
.post("/",VerifyTokenCRM,uploads.none(),CreateCountries)
.get("/",VerifyTokenCRM,GetCountries)

module.exports = router