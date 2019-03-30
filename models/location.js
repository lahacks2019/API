var { GraphQLObjectType, GraphQLString } = require('graphql');

const Location = new GraphQLObjectType({
    name: 'Location',
    fields: {
        lat: {type: GraphQLString},
        long: {type: GraphQLString},
    }

});

module.exports = Location;