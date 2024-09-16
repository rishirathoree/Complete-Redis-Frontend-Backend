const dotenv = require('dotenv').config()
const fs = require("fs");
const path = require("path");
const dirname = path.dirname(__filename);

const UPLOADS_FILES_PATH = path.join(__dirname, '../uploads')
const SALT_ROUNDS = 10
const PORT = process.env.PORT

const IPADDRESS = process.env.IP

const USER_GENDERS = ['Male', 'Female']

const PAGE_COUNT = 20

const ISPRODUTIONS = process.env.PRODUCTION === 'true' ? true : false

const BASE_URL = process.env.BASE_URL

const IMAGE_STATIC_URL = ISPRODUTIONS ? BASE_URL : `http://${IPADDRESS}:${PORT}/images/`

const CORS_CONFIG = {
  origin: ['http://localhost:5173']
}

// token keys
const REFRESH_PUBLIC_KEY = fs.readFileSync(
  path.join(dirname, "../token_secrets/refresh_public_key.pem"),
  "utf-8"
);

const REFRESH_PRIVATE_KEY = fs.readFileSync(
  path.join(dirname, "../token_secrets/refresh_private_key.pem"),
  "utf-8"
);

const ACCESS_PUBLIC_KEY = fs.readFileSync(
  path.join(dirname, "../token_secrets/access_public_key.pem"),
  "utf-8"
);

const ACCESS_PRIVATE_KEY = fs.readFileSync(
  path.join(dirname, "../token_secrets/access_private_key.pem"),
  "utf-8"
);

const TOP_ROLES = ['ADMIN','SUBADMIN','STAFF','VENDOR']

const TOP_PERMISSSIONS = ['CATEGORIES','SUBCATEGORIES','PRODUCTS','PETS','BREEDS','QUERIES','OWNERS']

module.exports = {
  PORT, PAGE_COUNT, CORS_CONFIG,
  IPADDRESS, SALT_ROUNDS,
  IMAGE_STATIC_URL,
  UPLOADS_FILES_PATH,
  ISPRODUTIONS,TOP_ROLES,
  BASE_URL,
  USER_GENDERS,TOP_PERMISSSIONS,
  REFRESH_PUBLIC_KEY, REFRESH_PRIVATE_KEY, ACCESS_PUBLIC_KEY, ACCESS_PRIVATE_KEY,
}