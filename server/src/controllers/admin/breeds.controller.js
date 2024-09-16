const { countries,states,cities,breeds,pets,products } = require("../../../models");
const { ApiResponse, ApiError } = require("../../lib/class.lib");
const { asyncHandler } = require("../../lib/helper.lib");
const { Op, where, Sequelize } = require("sequelize");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const { PAGE_COUNT, IMAGE_STATIC_URL } = require("../../constants");

const CreateBreed = asyncHandler(async(req,res)=>{

    const { name, description,petId } = req.body
    
    const petExst = await pets.findOne({
        where: {
            id: {
                [Op.eq]: petId
            }
        }
    })
    
    if(!petExst){ throw new ApiError(400,"Pets Invalid not found")}
    
    const image = req.file && req.file.filename

    let breedMade;

    breedMade = await breeds.create({
        name,
        description,
        petId,
        image,
    })

    return res.status(201).json(new ApiResponse(201, { breed: breedMade }, "Success"))
})

const GetBreed = asyncHandler(async(req,res)=>{

    const { page = 1, count = PAGE_COUNT } = req.query

    const whereClause = {};

        const includeClause = [
            {
                model: pets,
                attributes: ['id', 'name',]
            },
            {
                model: products,
                required:false,
                duplicating: false,
                attributes: [],
                through: { attributes: [] },
            },
        ]

        const attributes = {
            include:[
                [Sequelize.fn("CONCAT",IMAGE_STATIC_URL,Sequelize.col("breeds.image")),'image']
            ]
        }

        const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(breeds,whereClause, page, count, includeClause)

        const breedList = await breeds.findAll({
            where: whereClause,
            include: includeClause,
            order: [['createdAt', 'DESC']],
            limit: limit,
            attributes,
            offset: offset
        })

        return res.status(200).json(new ApiResponse(200, { breeds:breedList, totalCount, totalPages }, 'Success'))
})


module.exports = {
    CreateBreed,
    GetBreed
}