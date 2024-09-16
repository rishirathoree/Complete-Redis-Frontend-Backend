const { countries } = require("../../../models");
const { ApiResponse } = require("../../lib/class.lib");
const { asyncHandler } = require("../../lib/helper.lib");
const { Op } = require("sequelize");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const { PAGE_COUNT } = require("../../constants");

const CreateCountries = asyncHandler(async (req, res) => {

    const { name } = req.body;

    let countriesMade;

    countriesMade = await countries.create({
        name
    })

    console.log(countriesMade)

    countriesMade = await countries.findOne({
        where: {
            id: {
                [Op.eq] : countriesMade.id
            }
        }
    })

    return res.status(200).json(new ApiResponse(200, { countries: countriesMade }, 'Success'));
})

const GetCountries = asyncHandler(async (req, res) => {

        const { page = 1, count = PAGE_COUNT } = req.query

        const whereClause = {};

        const includeClause = []

        const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(countries,whereClause, page, count, includeClause)

        const countriesList = await countries.findAll({
            where: whereClause,
            include: includeClause,
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset
        })

        return res.status(200).json(new ApiResponse(200, { countries:countriesList, totalCount, totalPages }, 'Success'))

})


module.exports = {
    CreateCountries,
    GetCountries
}