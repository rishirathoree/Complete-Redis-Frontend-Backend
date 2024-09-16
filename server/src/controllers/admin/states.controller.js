const { countries, states } = require("../../../models");
const { ApiResponse, ApiError } = require("../../lib/class.lib");
const { asyncHandler } = require("../../lib/helper.lib");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const { PAGE_COUNT } = require("../../constants");
const { Op } = require("sequelize");

const CreateStates = asyncHandler(async (req, res) => {

    const { name, countryId } = req.body

    const findCountryExist = await countries.findOne({
        where: {
            id: {
                [Op.eq] : countryId
            }
        }
    })

    if (!findCountryExist) {
        throw new ApiError(400, "Country doesn't exist")
    }

    let statesMade;

    statesMade = await states.create({
        name,
        countryId
    })

    statesMade = await states.findOne({
        where: {
            id:{
                [Op.eq] : statesMade.id
            }
        }
    })

    return res.status(201).json(new ApiResponse(200, { states: statesMade }, "Success"))

})


const GetStates = asyncHandler(async (req, res) => {

    const { page = 1, count = PAGE_COUNT } = req.query

    const whereClause = {};

    const includeClause = [
        {
            model: countries,
            attributes: ['id', 'name']
        }
    ]

    console.log('running')

    const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(states, whereClause, page, count, includeClause)

    const stateList = await states.findAll({
        where: whereClause,
        include: includeClause,
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset
    })

    return res.status(200).json(new ApiResponse(200, { states: stateList, totalCount, totalPages }, 'Success'))

})


module.exports = {
    CreateStates,
    GetStates,
}