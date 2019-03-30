var { GraphQLObjectType, GraphQLString } = require('graphql');
// var Location = require('../models/location');

const Item = new GraphQLObjectType({
    name: 'Item',
    fields: {
        name: { type : GraphQLString },
        description: { type: GraphQLString },
        expireDate: { type: GraphQLString },
        userID: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        location: { type: GraphQLString }   
    }

});

module.exports = Item;