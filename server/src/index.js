const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const requestIp = require("request-ip");
const rfs = require("rotating-file-stream");
const path = require("path");
const { fileURLToPath } = require("url");
const limiter = require("./config/rateLimiter.config.js");
const {
  handleSequelizeValidationError,
} = require("./lib/validationerror.lib.js");
const { ApiResponse, ApiError } = require("./lib/class.lib.js");
const { CORS_CONFIG, UPLOADS, PORT, IPADDRESS, UPLOADS_FILES_PATH } = require("./constants.js");
const errorHandler = require("./middlewares/error.middlewares.js");
const app = express();


const dirname = path.dirname(__filename);

const loggingStream = rfs.createStream("access.log", {
  interval: "1d", //rotate daily
  path: path.join(dirname, "../../logs"),
});

app.use(limiter);
app.use(morgan("combined", { stream: loggingStream }));
app.use(morgan("tiny"));
app.use(helmet());
app.use(cookieParser(process.env.BACKEND_COOKIE_SECRET));
app.use(cors(CORS_CONFIG));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors(CORS_CONFIG));
app.use(requestIp.mw());

app.use("/images", express.static(`${UPLOADS_FILES_PATH}`));
app.use(handleSequelizeValidationError);


// Admin Routes Imports

const countriesRouter = require('./routes/admin/countries.routes.js')
const statesRouter = require('./routes/admin/states.routes.js')
const citiesRouter = require('./routes/admin/cities.routes.js')
const petsRouter = require('./routes/admin/pets.routes.js')
const breedsRouter = require('./routes/admin/breeds.routes.js')
const brandsRouter = require('./routes/admin/brands.routes.js')
const categoriesRouter = require('./routes/admin/categories.routes.js')
const subcategoriesRouter = require('./routes/admin/subcategories.routes.js')
const productsRouter = require('./routes/admin/products.routes.js')
const ownersRouter = require('./routes/admin/owners.routes.js');
const { connectToRedis } = require("./config/redis.config.js");
const { runKafkaAdmin } = require("./kafka/config/kafka.admin.js");
const { runKafkaProducer } = require("./kafka/config/kafka.producer.js");

app.use("/admin/v1/countries", countriesRouter);
app.use("/admin/v1/states", statesRouter);
app.use("/admin/v1/cities", citiesRouter);
app.use("/admin/v1/pets", petsRouter);
app.use("/admin/v1/breeds", breedsRouter);
app.use("/admin/v1/brands", brandsRouter);
app.use("/admin/v1/categories", categoriesRouter);
app.use("/admin/v1/subcategories", subcategoriesRouter);
app.use("/admin/v1/products", productsRouter);
app.use("/admin/v1/owners", ownersRouter);

app.use("*", (req, res) => {
  throw new ApiError(400, "Pawlies route not found.");
});

// keep this error handler down after routes mentioned to let the error handle for all the above mentioned endpoints
app.use(errorHandler);

connectToRedis()
runKafkaAdmin()
runKafkaProducer()

app.listen(8787, () => {
  console.log('server connected')
})

module.exports = app;