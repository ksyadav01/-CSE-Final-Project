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
        deleteRegion(regionId: String!, _id: String!): [Region]
		deleteMap(_id: String!): Boolean
		updateMapName(_id: String!, value: String!): String
		deleteRegionFromMap(_id: String!, subregions: [RegionInput]!): [Region]
	}
    input RegionInput {
        _id: String
        id: Int
        name: String
        leader: String
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