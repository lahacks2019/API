var { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');
var User = require('../models/user');
var Transaction = require('../models/transaction');
var Restaurant = require('../models/restaurant');


var db = require('../utils/database');
var refItems = db.ref("server/items");
var refRestaurants = db.ref("server/restaurants");


var val = [];
refItems.on("child_added", function(snap) {
  val = [...val, snap.val()];
});

var restaurant_list = [];
refRestaurants.on("child_added", function(snap) {
  restaurant_list = [...restaurant_list, snap.val()];
});

var transactionsData = [
    {
        id: "1",
        userID: "1",
        itemID: "1",
        time: "today"
    }
]

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: { 

    // item
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
          console.log(val);
          return val;  
        }
    },

    // user
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
    getUserByEmail: {
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
            var count = 0;
            let val = {};
            refUsers.on("child_added", function(snap) {
              count++;
              return snap.val();
            });
            
            // length will always equal count, since snap.val() will include every child_added event
            // triggered before this point
            refUsers.once("value", function(snap) {
              console.log("initial data loaded!", snap.numChildren() === count);
            });
        }
    },

    // transaction
    transaction: {
        type: Transaction,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) }
        },
          resolve(parentValue, args) {
              const { id } = args;
  
              return transactionsData.filter(transaction =>{
                  return transaction.id  == id;
              })[0];
          }
    },
    transactions: {
        type: new GraphQLList(new GraphQLNonNull(Transaction)),
        resolve(parentValue){
            var count = 0;
            let val = {};
            refTransactions.on("child_added", function(snap) {
              count++;
              return snap.val();
            });
            
            // length will always equal count, since snap.val() will include every child_added event
            // triggered before this point
            refTransactions.once("value", function(snap) {
              console.log("initial data loaded!", snap.numChildren() === count);
            });
        }
    },
    restaurants: {
      type: new GraphQLList(new GraphQLNonNull(Restaurant)),
      resolve(parentValue){
        return restaurant_list;  
      }
  },
  }
});

module.exports = Query;