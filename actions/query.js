var { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');

var db = require('../utils/database');

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
            refItems.on("value", function(snapshot) {
                console.log(snapshot.val());
              }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
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