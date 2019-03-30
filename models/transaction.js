var { GraphQLObjectType, GraphQLString } = require('graphql');

const Transaction = new GraphQLObjectType({
    name: 'Transaction',
    fields: {
        id: { type : GraphQLString },
        itemID: { type : GraphQLString },
        userID: { type: GraphQLString },
        time: { type: GraphQLString },
    }

});

module.exports = Transaction;