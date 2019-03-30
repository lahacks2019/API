var { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLInt } = require('graphql');
var Item = require('../models/item');
var User = require('../models/user');
// var Location = require('../models/location');

var admin = require("firebase-admin");  

var serviceAccount = require("../utils/lahacksapp-firebase-adminsdk-psvcz-9144d45011.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lahacksapp.firebaseio.com"
});


var db = admin.database();
var ref = db.ref("server/");

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
                location: { type: new GraphQLNonNull(GraphQLString)} 
            },
            resolve(parentValue, args){
                var item = ref.child("items");
                item.set(args);
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
    }
});

module.exports = Mutation;
