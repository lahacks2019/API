var { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');
var User = require('../models/user');
var Transaction = require('../models/transaction');

//Test Data -> remove afer finishing testing
var itemsData = [
    {
        id: "1",
        name: 'Noodle',
        expireDate: '03-12-2019',
        description: 'Good food',
        userID: 'a1',
        imageURL: "https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg"
    },
    {
        id: "2",
        name: 'Sandwitch',
        expireDate: '03-15-2019',
        description: 'Medium food',
        userID: 'a1',
        imageURL: "https://cdn.pixabay.com/photo/2015/09/16/09/48/programming-942487_1280.jpg"
    },
    {
        id: "3",
        name: 'Chicken',
        expireDate: '03-16-2019',
        description: 'Fast food',
        userID: 'a2',
        imageURL: "https://cdn.pixabay.com/photo/2017/01/20/17/26/operating-system-1995434_1280.png"
    }
]

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
            return itemsData;
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