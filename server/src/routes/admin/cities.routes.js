const { Router } = require("express");
const uploads = require("../../config/multer.config");
const { CreateCities, GetCities } = require("../../controllers/admin/cities.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");

const router = Router()

router
    .post("/",VerifyTokenCRM, uploads.none(), CreateCities)
    .get("/",VerifyTokenCRM, GetCities)

module.exports = router