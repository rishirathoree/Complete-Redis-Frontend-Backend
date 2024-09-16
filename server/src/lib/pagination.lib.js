const { countries,states } = require("../../models")

const calculateLimitOffsetTotalCountAndPages = async (Model, whereClause, page, count, include = [], attributes = {}, group = []) => {
    let offset = null;
    let limit = null;
    let totalCount = 0;
    let totalPages = 0;

    if (count && page) {
        offset = Math.abs((page - 1) * count)
        limit = count;
        const results = await Model.findAll({
            where: whereClause,
            include: include,
            attributes: attributes,
            group: group,
        });
        totalCount = results.length;
        totalPages = Math.ceil(totalCount / count);
    } else {
        const results = await Model.findAll({
            where: whereClause,
            include: include,
            attributes: attributes,
            group: group
        });
        totalCount = results.length;
        totalPages = 1;
    }

    return { totalCount, totalPages, limit, offset };
}

module.exports = { calculateLimitOffsetTotalCountAndPages };
