const { model, Schema, ObjectId } = require('mongoose');
const Region = require('./region-model').schema;

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
		regionList: [Region]
	},
	{ timestamps: true }
);

const Map = model('Map', mapSchema);
module.exports = Map;