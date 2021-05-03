const { model, Schema, ObjectId } = require('mongoose');
//const Item = require('./item-model').schema;

const regionSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        capital: {
            type: String,
            required: true
        },
        leader: {
            type: String,
            required: true
        },
        flag: {
            type: String,
            required: true
        },
        landmarks: {
            type: Array,
            required: true
        },
        subregions: {
            type: Array,
            requried: true
        }
        
    }
);

const Region = model('Region', regionSchema);
module.exports = Region;