const { countries,states,cities,breeds,pets,brands,products } = require("../../../models");
const { ApiResponse, ApiError } = require("../../lib/class.lib");
const { asyncHandler } = require("../../lib/helper.lib");
const { Op, where, Sequelize, fn, col } = require("sequelize");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const { PAGE_COUNT, IMAGE_STATIC_URL } = require("../../constants");

const CreateBrands = asyncHandler(async(req,res)=>{

    const { name, description } = req.body
    
    const image = req.file && req.file.filename

    let brandMade;

    brandMade = await brands.create({
        name,
        description,
        image,
    })

    return res.status(201).json(new ApiResponse(201, { brand: brandMade }, "Success"))
})

const GetBrands = asyncHandler(async(req,res)=>{

    const { page = 1, count = PAGE_COUNT } = req.query

    const whereClause = {};

    const includeClause = [
        {
            model: products,
            attributes: [],
            required: false,
            duplicating: false,
            through: { attributes: [] },
        },
    ]

        const attributes = {
            include:[
                [fn('COUNT', col('products.id')), 'totalProducts'],
                [Sequelize.fn("CONCAT",IMAGE_STATIC_URL,Sequelize.col("image")),'image']
            ]
        }

        const group = ['brands.id','products.id']

        const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(brands,whereClause, page, count, includeClause,group)

        const brandList = await brands.findAll({
            where: whereClause,
            include: includeClause,
            order: [['createdAt', 'DESC']],
            limit: limit,
            attributes,
            group,
            offset: offset
        })

        return res.status(200).json(new ApiResponse(200, { brands:brandList, totalCount, totalPages }, 'Success'))
})


module.exports = {
    CreateBrands,
    GetBrands
}