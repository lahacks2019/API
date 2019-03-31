var { GraphQLObjectType, GraphQLString, GraphQLFloat } = require('graphql');
// var Location = require('../models/location');

const Restaurant = new GraphQLObjectType({
    name: 'Restaurant',
    fields: {
        id: { type : GraphQLString },
        name: { type : GraphQLString },
        pictureURL: { type: GraphQLString},
        fbID: { type: GraphQLString },
        defaultLocation: { type: GraphQLString },
        benefits: { type: GraphQLString},
        rating: { type: GraphQLFloat} 
    }

});

module.exports = Restaurant;