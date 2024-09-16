const { passwordHasher, bcrypterHashedPassword } = require("../../lib/auth.lib");
const { asyncHandler } = require("../../lib/helper.lib");
const { owners } = require("../../../models");
const { ApiResponse, ApiError } = require("../../lib/class.lib");
const { Op } = require("sequelize");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const { PAGE_COUNT } = require("../../constants");
const { GenerateRefreshAccessToken } = require("../../middlewares/crm.middlewares");
const CreateManagements = asyncHandler(async (req, res) => {
    // Add your logic here
    console.log(req.body)

    const { firstName, lastName, email, password, phoneNumber, roles, permissions, username } = req.body

    const hashedPassword = await passwordHasher(password)

    let managementMade

    managementMade = await owners.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        username,
        roles,
        permissions,
    })

    managementMade = await owners.findOne({
        where: {
            id: {
                [Op.eq]: managementMade.id
            }
        },
    })

    return res.status(201).json(new ApiResponse(201, { admin: managementMade }, "Successfully created the managements"))

})

const GetManagements = asyncHandler(async (req, res) => {

    const { page = 1, count = PAGE_COUNT } = req.query

    const whereClause = {};

    const includeClause = []

    const attributes = {}

    const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(owners, whereClause, page, count, includeClause,)

    const managementList = await owners.findAll({
        where: whereClause,
        include: includeClause,
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset
    })

    return res.status(200).json(new ApiResponse(200, { admin: managementList, totalCount, totalPages }, 'Success'))
})

const GetLogins = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    const management = await owners.findOne({
        where: {
            username: {
                [Op.eq]: username
            }
        }
    })

    if (!management) {
        throw new ApiError(400, "Staff not found")
    }

    const isMatch = await bcrypterHashedPassword(password, management.password)

    if (!isMatch) {
        return res.status(401).json(new ApiResponse(401, {}, "Invalid credentials"))
    }

    const { accessToken, refreshToken } = await GenerateRefreshAccessToken(management.id)

    return res.status(200).json(new ApiResponse(200, { admin: management,accessToken, refreshToken }, "Login successful"))
})

module.exports = {
    CreateManagements,
    GetManagements,
    GetLogins
}