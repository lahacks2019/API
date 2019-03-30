var { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');
var User = require('../models/user');
var db = require('../utils/database');
var refItems = db.ref("server/items");

var usersData = []

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: { 

    //item
    item: {
        type: Item,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) }
        },
          resolve(parentValue, args) {
              const { id } = args;
  
              return itemsData.filter(item =>{
                  return item.id  == id;
              })[0];
          }
    },
    items: {
        type: new GraphQLList(new GraphQLNonNull(Item)),
        resolve(parentValue){
            var count = 0;
            let val = {};
            refItems.on("child_added", function(snap) {
              count++;
              return snap.val();
            });
            
            // length will always equal count, since snap.val() will include every child_added event
            // triggered before this point
            refItems.once("value", function(snap) {
              console.log("initial data loaded!", snap.numChildren() === count);
            });
        }
    },

    //user
    user: {
        type: User,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) }
        },
          resolve(parentValue, args) {
              const { id } = args;
  
              return usersData.filter(user =>{
                  return user.id  == id;
              })[0];
          }
    },
    getUsersByEmail: {
        type: User,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) }
        },
          resolve(parentValue, args) {
              const { email } = args;
  
              return usersData.filter(user =>{
                  return user.email  == email;
              })[0];
          }
    },
    users: {
        type: new GraphQLList(new GraphQLNonNull(User)),
        resolve(parentValue){
            return usersData;
        }
    },
  }
});

module.exports = Query;