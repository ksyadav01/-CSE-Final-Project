const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map {
		_id: String!
		id: Int!
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
		getAllMaps: Map
	}
	extend type Mutation {
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
`;

module.exports = { typeDefs: typeDefs }