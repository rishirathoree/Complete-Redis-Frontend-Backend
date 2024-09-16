const { Op, Sequelize } = require("sequelize");
const { pets, breeds } = require("../../../models");
const { asyncHandler } = require("../../lib/helper.lib");
const { ApiResponse } = require("../../lib/class.lib");
const { PAGE_COUNT, IMAGE_STATIC_URL } = require("../../constants");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const CreatePets = asyncHandler(async (req, res) => {
    const { name, blocked } = req.body;

    let petsMade;

    const image = req.file && req.file.filename
    petsMade = await pets.create({
        name, image
    })


    petsMade = await pets.findOne({
        where: {
            id: {
                [Op.eq]: petsMade.id
            }
        }
    })

    return res.status(200).json(new ApiResponse(200, { pets: petsMade }, 'Success'));
})

const GetPets = asyncHandler(async (req, res) => {

    const { page = 1, count = PAGE_COUNT } = req.query

    const whereClause = {};

    const includeClause = [
        {
            model: breeds,
            attributes: {
                include: [
                    [Sequelize.fn("CONCAT", IMAGE_STATIC_URL, Sequelize.col("breeds.image")), 'image'],
                ]
            },
            required: false,
            duplicating: false
        }
    ]

    const attributes = {
        include: [
            [Sequelize.fn("COUNT", Sequelize.col("breeds.id")), 'total'],
            [Sequelize.fn("CONCAT", IMAGE_STATIC_URL, Sequelize.col("pets.image")), 'image']
        ]
    }

    const group = ['pets.id', 'breeds.id']

    const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(pets, whereClause, page, count, includeClause, attributes, group)

    const petsLists = await pets.findAll({
        where: whereClause,
        include: includeClause,
        order: [['createdAt', 'DESC']],
        limit: limit,
        attributes,
        group,
        offset: offset
    })

    return res.status(200).json(new ApiResponse(200, { pets: petsLists, totalCount, totalPages }, 'Success'))

})

module.exports = {
    CreatePets,
    GetPets
}