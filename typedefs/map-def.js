const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map {
		_id: String!
		id: Int!
        name: String!
		owner: String!
		regionList: [Region]
	}
    type Region {
        _id: String!
        id: Int!
        name: String!
        leader: String!
        capital: String!
        flag: String!
        landmarks: [String]
        subregion: [Int]
    }
	extend type Query {
		getAllMaps: [Map]
	}
	extend type Mutation {
        createNewMap(map: MapInput!): String
		addRegionToMap(_id: String!, regionList: [RegionInput]!): [Region]
		deleteRegionFromMap(_id: String!, regionList: [RegionInput]!): [Region]
	}
    input RegionInput {
        _id: String
        id: Int
        name: String
        leader: String
        capital: String
        flag: String
        landmarks: [String]
        subregion: [Int]
    }
    input MapInput {
		_id: String!
		id: Int!
        name: String!
		owner: String!
		regionList: [RegionInput]
	}
`;

module.exports = { typeDefs: typeDefs }