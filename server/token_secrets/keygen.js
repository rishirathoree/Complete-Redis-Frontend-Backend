const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const refreshKey = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});
const accessKey = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});
fs.writeFileSync(
  path.join(__dirname, "./refresh_public_key.pem"),
  refreshKey.publicKey
);
fs.writeFileSync(
  path.join(__dirname, "./refresh_private_key.pem"),
  refreshKey.privateKey
);
fs.writeFileSync(
  path.join(__dirname, "./access_public_key.pem"),
  accessKey.publicKey
);
fs.writeFileSync(
  path.join(__dirname, "./access_private_key.pem"),
  accessKey.privateKey
);