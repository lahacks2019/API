var { GraphQLObjectType, GraphQLString } = require('graphql');

const Transaction = new GraphQLObjectType({
    name: 'Transaction',
    fields: {
        itemID: { type : GraphQLString },
        userID: { type: GraphQLString },
        time: { type: GraphQLString },
    }

});

module.exports = Transaction;