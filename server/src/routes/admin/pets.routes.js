'use strict';
const { Router } = require("express");
const uploads = require("../../config/multer.config");

const { CreatePets, GetPets } = require("../../controllers/admin/pets.controller");
const { VerifyTokenCRM } = require("../../middlewares/crm.middlewares");
const router = Router();

router
// define
.post("/",VerifyTokenCRM,uploads.single("image"),CreatePets)
.get("/",VerifyTokenCRM,GetPets)

module.exports = router;

