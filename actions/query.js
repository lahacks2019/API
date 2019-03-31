var { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');
var User = require('../models/user');
var Transaction = require('../models/transaction');
var Restaurant = require('../models/restaurant');



var db = require('../utils/database');
var refItems = db.ref("server/items");
var refRestaurants = db.ref("server/restaurants");
var refUsers = db.ref("server/users");
var refTransaction = db.ref("server/transactions");



var val = [];
refItems.on("child_added", function(snap) {
  val = [...val, snap.val()];
});

var user_list = [];
refUsers.on("child_added", function(snap) {
  user_list = [...user_list, snap.val()];
});

var restaurant_list = [];
refRestaurants.on("child_added", function(snap) {
  restaurant_list = [...restaurant_list, snap.val()];
});

var transaction_list = [];
refTransaction.on("child_added", function(snap) {
  transaction_list = [...transaction_list, snap.val()];
});

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
          return user_list;    
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
            return transaction_list;
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