const { countries,states,cities } = require("../../../models");
const { ApiResponse, ApiError } = require("../../lib/class.lib");
const { asyncHandler } = require("../../lib/helper.lib");
const { Op, where } = require("sequelize");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const { PAGE_COUNT } = require("../../constants");


const CreateCities = asyncHandler(async(req,res)=>{
    const { name, stateId } = req.body

    const findStateExist = await states.findOne({
        where: {
            id: {
                [Op.eq] : stateId
            },
        },
        include:[
            {
                model: countries,
                attributes: ['id', 'name']
            }
        ]
    })

    if (!findStateExist) {
        throw new ApiError(400, "State doesn't exist")
    }

    const countryId = findStateExist.country.id

    let citiesMade;

    citiesMade = await cities.create({
        name,
        countryId,
        stateId
    })

    citiesMade = await cities.findOne({
        where: {
            id:{
                [Op.eq] : citiesMade.id
            }
        }
    })

    return res.status(201).json(new ApiResponse(200, { cities: citiesMade }, "Success"))
})


const GetCities = asyncHandler(async (req, res) => {
    const { page = 1, count = PAGE_COUNT } = req.query

    const whereClause = {};

    const includeClause = [
        {
            model: states,
            attributes: ['id', 'name']
        },
        {
            model: countries,
            attributes: ['id', 'name']
        }
    ]

    const { limit, offset, totalCount, totalPages } = calculateLimitOffsetTotalCountAndPages(cities,whereClause,page,count,includeClause);

    const citiesList = await cities.findAll({
        where: whereClause,
        include: includeClause,
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset
    })

    return res.status(200).json(new ApiResponse(200, { cities: citiesList, totalCount, totalPages }, 'Success'))
})


module.exports = {
    CreateCities,
    GetCities
}