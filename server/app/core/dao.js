let mongoose = require("mongoose");

class DAO {

    constructor(model) {
        this.model = model;
    }

    paginate(query, page, limit, populate = [], sort = null, select) {
        return this.model.paginate(query, {
            select: select || "-password",
            page,
            limit: parseInt(limit),
            populate,
            sort,
            lean: true,
            leanWithId: false
        });
    }

    findById(id, lean = true, select = "-password", populate = []) {
        let chain = this.model.findById(id).select(select).populate(populate);
        return lean ? chain.lean().exec() : chain.exec();
    }

    findOne(query, lean = true, select = "-password", populate = []) {
        let chain = this.model.findOne(query).select(select).populate(populate);
        return lean ? chain.lean().exec() : chain.exec();
    }

    save(instance) {
        return instance.save();
    }

    update(id, data, operation = "$set") {
        return this.model.findByIdAndUpdate(id, { [operation]: data }, { new: true });
    }

    findAndUpdate(query, data) {
        return this.model.findOneAndUpdate(query, data, { new: true });
    }

    updateMany(docs) {
        console.log('docs', docs);
        return this.model.updateMany({ doc: { $in: docs } }, { status: true }, { multi: true })
    }

    delete(id) {
        return this.model.findByIdAndDelete(id);
    }

    findOneAndDelete(query) {
        return this.model.findOneAndDelete(query);
    }

    deleteAll(query) {
        return this.model.remove(query);
    }

    find(query, projection, populate = [], sort = null) {
        return this.model.find(query).select(projection).populate(populate).sort(sort).lean().exec();
    }

    count(query) {
        return this.model.count(query).lean().exec();
    }

    insertMany(data) {
        return this.model.insertMany(data);
    }

    deleteFields(query) {
        return this.model.updateMany({ $pull: query });
    }

    deleteMany(docIds) {
        return this.model.remove({ _id: { $in: docIds } }, err => { });
    }

    findOneOrSave(query, data) {
        return this.model.findOneAndUpdate(query, { $set: data }, { new: true, upsert: true });
    }

    aggregate(aggregation) {
        return this.model.aggregate(aggregation);
    }
}

module.exports = DAO;