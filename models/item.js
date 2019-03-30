var { GraphQLObjectType, GraphQLString } = require('graphql');
var Location = require('../models/location');

const Item = new GraphQLObjectType({
    name: 'Item',
    fields: {
        id : { type : GraphQLString },
        name: { type : GraphQLString },
        description: { type: GraphQLString },
        expireDate: { type: GraphQLString },
        userID: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        location: { type: Location}   
    }

});

module.exports = Item;