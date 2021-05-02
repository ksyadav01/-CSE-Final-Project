const { gql } = require('apollo-server');


const typeDefs = gql `
    type Region {
        _id: String!
        id: Int!
        name: String!
        leader: String!
        capital: String!
        flag: String!
        landmarks: [String]
        subregion: [Region]
    }
    extend type Query {
        getAllRegions: [Region]
    }
    extend type Mutation {
        addRegion(region: RegionInput!, _id: String!, index: Int!): String
        deleteRegion(regionId: String!, _id: String!): [Region]
        updateRegionField(regionId: String!, _id: String!, field: String!, value: String!, flag: Int!): [Region]
        reorderRegionName(_id: String!):[ Region]
        reorderRegionCapital( _id: String!):[ Region]
        reorderRegionLeader( _id: String!):[ Region]
        reorderRegionFlag( _id: String!):[ Region]
        reorderRegionLandmarks( _id: String!):[ Region]
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