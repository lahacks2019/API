var { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = require('graphql');
var Location = require('../models/location');

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type : GraphQLString },
        email: { type : GraphQLString },
        identity: { type: GraphQLString },
        defaultLocation: { type: GraphQLString },
        rating : { type: GraphQLFloat },
        reviews: { type: GraphQLInt },
        benefits: { type: GraphQLString}
    }

});

module.exports = User;