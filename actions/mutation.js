var { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');
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
    }
});

module.exports = Mutation;
