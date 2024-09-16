const { countries, states, cities, breeds, pets, brands, categories, products } = require("../../../models");
const { ApiResponse, ApiError } = require("../../lib/class.lib");
const { asyncHandler } = require("../../lib/helper.lib");
const { Op, where, Sequelize, fn,col } = require("sequelize");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const { PAGE_COUNT, IMAGE_STATIC_URL } = require("../../constants");
const CreateCategories = asyncHandler(async (req, res) => {

    const { name, description } = req.body

    const image = req.file && req.file.filename

    let categoriesMade;

    categoriesMade = await categories.create({
        name,
        description,
        image,
    })

    categoriesMade = await categories.findOne({
        where: {
            id: {
                [Op.eq]: categoriesMade.id
            }
        },
        attributes: {
            include: [
                [fn("CONCAT", IMAGE_STATIC_URL, col("image")), 'image']
            ]
        }
    })

    return res.status(201).json(new ApiResponse(201, { categories: categoriesMade }, "Success"))
})

// const GetCategories = asyncHandler(async (req, res) => {

//     const { page = 1, count = PAGE_COUNT, name } = req.query

//     const whereClause = {};

//     if (name) {
//         whereClause.name = {
//             [Op.iLike]: `%${name}%`
//         }
//     }

//     const includeClause = [
//         {
//             model: products,
//             // attributes: ['id', 'title'],
//             required: false,
//             duplicating: false,
//             through: { attributes: [] },
//         }
//     ]

//     const attributes = {
//         include: [
//             [fn("CONCAT", IMAGE_STATIC_URL, col("image")), 'image'],
//             [fn('COUNT', col('products.id')), 'productCount'],
//         ]
//     }

//     const group = ['products.id','categories.id']

//     const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(categories, whereClause, page, count, includeClause,group)

//     const categoriesList = await categories.findAll({
//         where: whereClause,
//         include: includeClause,
//         attributes,
//         group,
//         order: [['createdAt', 'DESC']],
//         limit: limit,
//         offset: offset
//     })

//     return res.status(200).json(new ApiResponse(200, { categories: categoriesList, totalCount, totalPages }, 'Success'))
// })

const GetCategories = asyncHandler(async (req, res) => {
    const { page = 1, count = PAGE_COUNT, name } = req.query;

    const whereClause = {};

    if (name) {
        whereClause.name = {
            [Op.iLike]: `%${name}%`
        };
    }

    const includeClause = [
        {
            model: products,
            attributes: [],  // No need to include attributes here
            required: false,
            duplicating: false,
            through: { attributes: [] },
        }
    ];

    const attributes = [
        'id',
        'name',
        'image',
        'description',
        [fn("CONCAT", IMAGE_STATIC_URL, col("image")), 'image'],
        [fn('COUNT', col('products.id')), 'productCount'],
    ];

    const group = ['categories.id', 'categories.name', 'categories.image'];

    const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(categories, whereClause, page, count, includeClause, group);

    const categoriesList = await categories.findAll({
        where: whereClause,
        include: includeClause,
        attributes,
        group,
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset
    });

    return res.status(200).json(new ApiResponse(200, { categories: categoriesList, totalCount, totalPages }, 'Success'));
});



module.exports = {
    CreateCategories,
    GetCategories
}