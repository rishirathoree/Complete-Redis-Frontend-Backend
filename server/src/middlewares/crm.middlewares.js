const { owners } = require("../../models")
const jwt = require('jsonwebtoken')
const { REFRESH_PUBLIC_KEY, ACCESS_PRIVATE_KEY, ACCESS_PUBLIC_KEY, REFRESH_PRIVATE_KEY } = require("../constants");
const { asyncHandler } = require("../lib/helper.lib");
const { ApiError } = require("../lib/class.lib");
const { clientRedis } = require("../config/redis.config");

const CreateTokens = async (teamId) => {
    const token = jwt.sign({ userId: teamId }, ACCESS_PRIVATE_KEY, { algorithm: "RS256" });
    return token
}

const GenerateRefreshAccessToken = async (teamId) => {

    const accessToken = jwt.sign(
        { userId: teamId, },
        ACCESS_PRIVATE_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY, algorithm: "RS256" }
    );

    const refreshToken = jwt.sign(
        { userId: teamId, },
        REFRESH_PRIVATE_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY, algorithm: "RS256" }
    );

    return { accessToken, refreshToken }

}

const VerifyTokenCRM = asyncHandler(async (req, res, next) => {
    
    const accessToken = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!accessToken) throw new ApiError(404, null, { msg: "No token found" });

    jwt.verify(accessToken, ACCESS_PUBLIC_KEY, { algorithms: "RS256" }, async (err, decoded) => {
        if (err) {
            throw new ApiError(401, null, { msg: "Invalid token" });
        } else {
            const cachedTokenData = await clientRedis.get(decoded.userId);

            if (cachedTokenData) {
                console.log('cached token data')
                const parsedTokenData = JSON.parse(cachedTokenData);
                req.teams = parsedTokenData;
                req.role = parsedTokenData.roles || null;
                req.teamId = parsedTokenData.id;
                return next();
            } else {
                console.log('uncached token data')
                const teams = await owners.findByPk(decoded.userId);
                if (!teams) throw new ApiError(404, null, { msg: "User not found" });

                await clientRedis.set(decoded.userId, JSON.stringify(teams), 'EX', 3600);

                req.teams = teams;
                req.role = req.roles;
                req.teamId = teams.id;

                next(); // Continue to the next middleware
            }
        }
    });
});


    module.exports = {
        CreateTokens,
        GenerateRefreshAccessToken,VerifyTokenCRM
    }
