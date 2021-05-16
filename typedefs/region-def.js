const { gql } = require('apollo-server');


const typeDefs = gql `
    type Region {
        _id: String!
        id: Int!
        name: String!
        leader: String!
        types: String!
		owner: String!
        capital: String!
        flag: String!
        landmarks: [String]
        subregions: [String]
    }
    extend type Query {
        getAllRegions: [Region]
		getRegionById(_id: String!): Region 
    }
    extend type Mutation {
        addRegion(region: RegionInput!, _id: String!, index: Int!): String
        createNewRegion(region: RegionInput!, parentId: String!): String
        deleteRegion(parentId: String!, _id: String!): Boolean
		deleteMap(_id: String!): Boolean
		updateRegionName(_id: String!, value: String!): String
		updateRegionLandmark(_id: String!, value: String!): String
		deleteRegionLandmark(_id: String!, value: String!): String
        updateRegionField(itemId: String!,field: String!, value: String!): String
		reorderRegionFlipper( _id: String!, prevRegions: [String]!):String
        reorderRegionName(_id: String!): String
        reorderRegionCapital( _id: String!): String
        reorderRegionLeader( _id: String!): String
        reorderRegionFlag( _id: String!):[ Region]
        reorderRegionLandmarks( _id: String!):[ Region]
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
`;

module.exports = { typeDefs: typeDefs }