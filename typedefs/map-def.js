const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map {
		_id: String!
		id: Int!
		regionList: [Region]
	}
	extend type Query {
		getMap: Map!
	}
	extend type Mutation {
		addRegionToMap(_id: String!, regionList: [RegionInput]!)
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
        subregion: [Region]
    }
`;

module.exports = { typeDefs: typeDefs }