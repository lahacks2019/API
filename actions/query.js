var { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');
var User = require('../models/user');
var Transaction = require('../models/transaction');

var db = require('../utils/database');
var refItems = db.ref("server/items");

var val;
refItems.on("child_added", function(snap) {
  val = snap.val();
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
          return [val];  
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
          return [val];  
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
          return [val];  
        }
    },
  }
});

module.exports = Query;