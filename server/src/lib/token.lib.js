const jwt = require("jsonwebtoken");
const { ACCESS_PRIVATE_KEY, REFRESH_PRIVATE_KEY } = require("../constants");

// const accessToken = jwt.sign(
//     { userId: findEmailAddress.id },
//     ACCESS_PRIVATE_KEY,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY, algorithm: 'RS256' }
// );

// const refreshToken = jwt.sign(
//     { userId: findEmailAddress.id },
//     REFRESH_PRIVATE_KEY,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY, algorithm: 'RS256' }
// );

const CreateAccessToken = (data) => {
    const accessToken = jwt.sign(data, ACCESS_PRIVATE_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY, algorithm: 'RS256' });
    return accessToken;
}

const CreateRefreshToken = (data) => {
    const refreshToken = jwt.sign(data, REFRESH_PRIVATE_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY, algorithm: 'RS256' });
    return refreshToken;
}

module.exports = {
    CreateAccessToken,
    CreateRefreshToken
}