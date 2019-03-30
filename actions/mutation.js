var { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');
var Location = require('../models/location');


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addItem:{
            type: Item ,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
                name: { type: new GraphQLNonNull(GraphQLString)},
                description: { type: new GraphQLNonNull(GraphQLString)},
                expireDate: { type: new GraphQLNonNull(GraphQLString)},
                userID: { type: new GraphQLNonNull(GraphQLString) },
                imageURL: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(Location)} 
            },
            resolve(parentValue, args){
                const {
                    id,
                    name,
                    description,
                    expireDate,
                    userID,
                    imageURL,
                    location,
                  } = args;
                  return {item: "1"}
            }
        },
        addItemTest:{
            type: Item,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                const {id} = args;
                return "add Item"
        }
        }
    }
});

module.exports = Mutation;
