exports.find = async (Model, filters) => {
    const doc = await Model.findOne(filters);
    return doc;
};

exports.createOne = async (Model, data) => {
    const doc = await Model.create(data);
    return doc;
};

exports.updateOne = async (Model, filters,data) => {
    const doc = await Model.updateOne(filters,data);
    return doc;
};
exports.findById = async (Model,id) => {
    const doc = await Model.findById(id);
    return doc;
};
