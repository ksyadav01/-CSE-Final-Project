const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map {
		_id: String!
		id: Int!
        name: String!
		owner: String!
		subregions: [String]
	}
    type Region {
        _id: String!
        id: Int!
        name: String!
        leader: String!
        types: String
		owner: String!
        capital: String!
        flag: String!
        landmarks: [String]
        subregions: [String]
    }
	extend type Query {
		getAllMaps: [Map]
        getAllRegions: [Region]
		getRegionById(_id: String!): Region 
	}
	extend type Mutation {
        createNewMap(map: MapInput!): String
        createNewRegion(region: RegionInput!, parentId: String!): String
		addRegionToMap(_id: String!, subregions: [RegionInput]!): [Region]
        deleteRegion(parentId: String!, _id: String!): Boolean
		deleteMap(_id: String!): Boolean
		updateMapName(_id: String!, value: String!): String
		updateRegionName(_id: String!, value: String!): String
		deleteRegionFromMap(_id: String!, subregions: [RegionInput]!): [Region]
        updateRegionField(itemId: String!,field: String!, value: String!): String
		reorderRegionFlipper( _id: String!, prevRegions: [String]!):String
        reorderRegionName(_id: String!):String
        reorderRegionCapital( _id: String!): String
        reorderRegionLeader( _id: String!): String
	}
    input RegionInput {
        _id: String
        id: Int
        name: String
        leader: String
        types: String
		owner: String!
        capital: String
        flag: String
        landmarks: [String]
        subregions: [String]
    }
    input MapInput {
		_id: String!
		id: Int!
        name: String!
		owner: String!
		subregions: [String]
	}
`;

module.exports = { typeDefs: typeDefs }