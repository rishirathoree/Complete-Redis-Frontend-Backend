const { countries, states, cities, breeds, pets, subcategories, categories, products } = require("../../../models");
const { ApiResponse, ApiError } = require("../../lib/class.lib");
const { asyncHandler } = require("../../lib/helper.lib");
const { Op, where, Sequelize, fn, col } = require("sequelize");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const { PAGE_COUNT, IMAGE_STATIC_URL } = require("../../constants");

const CreateSubCategories = asyncHandler(async (req, res) => {

    const { name, description, categoryId } = req.body

    const catExist = await categories.findOne({
        where: {
            id: {
                [Op.eq]: categoryId
            }
        }
    })

    if (!catExist) throw new ApiError(400, "Category not found")

    const image = req.file && req.file.filename

    let subCategoriesMade;

    subCategoriesMade = await subcategories.create({
        name,
        description,
        image,
        categoryId
    })

    const includeClause = [
        {
            model: products,
            attributes: ['id', 'title',],
            through: { attributes: [] },
        },
        {
            model: categories,
            attributes: ['id', 'name', 'image'],
            attributes: {
                include: [
                    [Sequelize.fn("CONCAT", IMAGE_STATIC_URL, Sequelize.col("category.image")), 'image'],
                ],
                exclude: ['createdAt', 'updatedAt', 'deletedAt', 'blocked', 'description'],
            }
        },
    ]

    const attributes = {
        include: [
            [Sequelize.fn("CONCAT", IMAGE_STATIC_URL, Sequelize.col("subcategories.image")), 'image']
        ]
    }


    subCategoriesMade = await subcategories.findOne({
        where: {
            id: {
                [Op.eq]: subCategoriesMade.id
            }
        },
        include: includeClause,
        attributes,
    })

    return res.status(201).json(new ApiResponse(201, { subcategories: subCategoriesMade }, "Success"))
})

const GetSubCategories = asyncHandler(async (req, res) => {

    const { page = 1, count = PAGE_COUNT } = req.query

    const whereClause = {};

    const includeClause = [
        {
            model: categories,
            attributes: ['id', 'name', 'image'],
            attributes: {
                include: [
                    [Sequelize.fn("CONCAT", IMAGE_STATIC_URL, Sequelize.col("category.image")), 'image'],
                ],
                exclude: ['createdAt', 'updatedAt', 'deletedAt', 'blocked', 'description'],
            }
        },
        {
            model: products,
            attributes: [],
            required: false,
            duplicating: false,
            through: { attributes: [] },
        }
    ]

    const attributes = {
        include: [
            [fn('COUNT', col('products.id')), 'totalProducts'],
            [Sequelize.fn("CONCAT", IMAGE_STATIC_URL, Sequelize.col("subcategories.image")), 'image']
        ]
    }

    const group = ['subcategories.id', 'category.id']

    const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(subcategories, whereClause, page, count, includeClause,group)

    const subcategoriesList = await subcategories.findAll({
        where: whereClause,
        include: includeClause,
        order: [['createdAt', 'DESC']],
        limit: limit,
        attributes,
        group,
        offset: offset
    })

    return res.status(200).json(new ApiResponse(200, { subcategories: subcategoriesList, totalCount, totalPages }, 'Success'))
})


module.exports = {
    CreateSubCategories,
    GetSubCategories
}