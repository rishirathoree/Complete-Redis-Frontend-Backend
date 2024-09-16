const { Router } = require("express");
const uploads = require("../../config/multer.config");
const { CreateStates, GetStates } = require("../../controllers/admin/states.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");

const router = Router()

router
    .post("/",VerifyTokenCRM, uploads.none(), CreateStates)
    .get("/",VerifyTokenCRM, GetStates)


module.exports = router