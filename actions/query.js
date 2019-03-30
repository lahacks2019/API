var { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');
<<<<<<< HEAD
var User = require('../models/user');
var Transaction = require('../models/transaction');
=======
>>>>>>> 7d206917eb3c18f905c9ff2fd83a397c42cd0982

var db = require('../utils/database');

var usersData = [
    {
        id: "1",
        email: "restaurant@ucla.edu",
        identity: "restaurant",
        defaultLocation: "ucla",
        rating: 5.0,
        reviews: 0,
        benefits: "N/A"

    }
]

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
            refItems.on("value", function(snapshot) {
                console.log(snapshot.val());
              }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
              });
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
            return usersData;
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
            return transactionsData;
        }
    },
  }
});

module.exports = Query;