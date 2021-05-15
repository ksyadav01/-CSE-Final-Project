const { model, Schema, ObjectId } = require('mongoose');
const mapSchema = new Schema(
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
		owner: {
			type: String,
			required: true
		},
		subregions: {
            type: Array,
            requried: true
        }
	},
	{ timestamps: true }
);

const Map = model('Map', mapSchema);
module.exports = Map;