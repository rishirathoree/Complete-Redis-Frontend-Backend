const { products, productsjunctions, categories, subcategories, brands, breeds, pets, productoptions, productimages } = require("../../../models");
const { PAGE_COUNT, IMAGE_STATIC_URL } = require("../../constants");
const { ApiResponse } = require("../../lib/class.lib");
const { asyncHandler } = require("../../lib/helper.lib")
const { Op, col, literal, fn } = require("sequelize");
const { calculateLimitOffsetTotalCountAndPages } = require("../../lib/pagination.lib");
const { clientRedis } = require("../../config/redis.config");

const CreateProducts = asyncHandler(async (req, res) => {
    const {
        title, description, price, compareAtPrice, stock,
        categoryIds = [], subcategoryIds = [], brandIds = [], breedIds = [], petIds = [], options = []
    } = req.body

    console.log(req.files)

    const images = req.files && req.files.length > 0 && req.files.map(file => file.filename)

    const transaction = await products.sequelize.transaction();

    try {
        const validCategories = await categories.findAll({
            where: {
                id: {
                    [Op.in]: categoryIds
                }
            },
            transaction
        });

        const validSubcategories = await subcategories.findAll({
            where: {
                id: {
                    [Op.in]: subcategoryIds
                }
            },
            transaction
        });

        const validBrands = await brands.findAll({
            where: {
                id: {
                    [Op.in]: brandIds
                }
            },
            transaction
        });


        const validBreeds = await breeds.findAll({
            where: {
                id: {
                    [Op.in]: breedIds
                }
            },
            transaction
        });

        const validPets = await pets.findAll({
            where: {
                id: {
                    [Op.in]: petIds
                }
            },
            transaction
        });

        let productMade

        productMade = await products.create({
            title,
            description,
            price,
            compareAtPrice,
            stock,
        }, { transaction });

        if (images.length > 0) {
            await productimages.bulkCreate(images.map(image => ({ url: image, productId: productMade.id })), { transaction });
        }

        await productoptions.bulkCreate(options.map(opt => ({ option: opt, productId: productMade.id })), { transaction });

        const junctionEntries = [];

        options.map(option => {
            junctionEntries.push({ productId: productMade.id, option });
        });

        validCategories.forEach(category => {
            junctionEntries.push({ productId: productMade.id, categoryId: category.id });
        });

        validSubcategories.forEach(subcategory => {
            junctionEntries.push({ productId: productMade.id, subcategoryId: subcategory.id });
        });

        validBrands.forEach(brand => {
            junctionEntries.push({ productId: productMade.id, brandId: brand.id });
        });

        validBreeds.forEach(breed => {
            junctionEntries.push({ productId: productMade.id, breedId: breed.id });
        });

        validPets.forEach(pet => {
            junctionEntries.push({ productId: productMade.id, petId: pet.id });
        });

        if (junctionEntries.length > 0) {
            await productsjunctions.bulkCreate(junctionEntries, { transaction });
        }

        productMade = await products.findOne({
            where: {
                id: {
                    [Op.eq]: productMade.id
                }
            },
            include: [
                { model: productimages },
                { model: productoptions },
            ]
        })


        await transaction.commit();

        return res.status(201).json(new ApiResponse(201, { product: productMade }, 'Successfully created product'));

    } catch (error) {
        console.log(error)
        await transaction.rollback();
        return res.status(500).json({ message: error.message });
    }
});

const GetProducts = asyncHandler(async (req, res) => {
    const { page = 1, count = PAGE_COUNT } = req.query

    const whereClause = {};

    const cacheKey = `products_page_${page}_count_${count}`;

    const getProductsRedisStored = await clientRedis.get(cacheKey)

    if (getProductsRedisStored) {
        return res.status(200).json(new ApiResponse(200, { products: JSON.parse(getProductsRedisStored) }, 'Success redis'))
    }

    const includeClause = [
        // {
        //     model: subcategories,
        //     attributes: [],
        //     required: false,
        //     duplicating: false,
        //     through: { attributes: [] },
        // },
        // {
        //     model: breeds,
        //     attributes: [],
        //     required: false,
        //     duplicating: false,
        //     through: { attributes: [] },
        // },
        // {
        //     model: categories,
        //     required: false,
        //     duplicating: false,
        //     attributes: [],
        //     through: { attributes: [] },
        // },
        {
            model: brands,
            attributes: ['id', 'name'],
            through: { attributes: [] },
        },
        {
            model: productoptions,
            attributes: ['id', 'option']
        },
        {
            model: productimages,
            attributes: [
                [fn('CONCAT', IMAGE_STATIC_URL, col('url')), 'link'],
            ],
        },

    ]

    const attributes = [
        'id', 'title', 'description',
    ]


    const { totalCount, totalPages, limit, offset } = await calculateLimitOffsetTotalCountAndPages(products, whereClause, page, count, includeClause, attributes,)

    const productList = await products.findAll({
        where: whereClause,
        include: includeClause,
        order: [['title', 'DESC']],
        limit: limit,
        // group,
        attributes,
        offset: offset
    })

    await clientRedis.set(cacheKey, JSON.stringify(productList), 'EX', 3600);

    return res.status(200).json(new ApiResponse(200, { products: productList, totalCount, totalPages }, 'Success'))
})

module.exports = {
    CreateProducts, GetProducts
};
