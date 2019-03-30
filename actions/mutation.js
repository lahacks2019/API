var { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLInt } = require('graphql');
var Item = require('../models/item');
var User = require('../models/user');
var Transaction = require('../models/transaction');
// var Location = require('../models/location');

var db = require('../utils/database');

var ref = db.ref("server/");

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addItem:{
            type: Item ,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                description: { type: new GraphQLNonNull(GraphQLString)},
                expireDate: { type: new GraphQLNonNull(GraphQLString)},
                userID: { type: new GraphQLNonNull(GraphQLString) },
                imageURL: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString)} 
            },
            resolve(parentValue, args){
                var item = ref.child("items");
                item.push(args);
                if(item != null) return "SUCCESS";
                else return "FAIL";
            }
        },
        addUser:{
            type: User ,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
                email: { type: new GraphQLNonNull(GraphQLString)},
                identity: { type: new GraphQLNonNull(GraphQLString)},
                defaultLocation: { type: new GraphQLNonNull(GraphQLString)},
                rating: { type: new GraphQLNonNull(GraphQLFloat) },
                reviews: { type: new GraphQLNonNull(GraphQLInt) },
                benefits: { type: new GraphQLNonNull(GraphQLString)} 
            },
            resolve(parentValue, args){
                var user = ref.child("users");
                user.set(args);
            }
        },
        addTransaction:{
            type: Transaction ,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
                userID: { type: new GraphQLNonNull(GraphQLString)},
                itemID: { type: new GraphQLNonNull(GraphQLString)},
                time: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                var transaction = ref.child("transactions");
                transaction.set(args);
            }
        },
    }
});

module.exports = Mutation;
