var { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');

//Test Data -> remove afer finishing testing
var itemsData = [
    {
        id: "1",
        name: 'Noodle',
        expireDate: '03-12-2019',
        description: 'Good food',
        userID: 'a1',
        imageURL: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: "2",
        name: 'Sandwitch',
        expireDate: '03-15-2019',
        description: 'Medium food',
        userID: 'a1',
        imageURL: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: "3",
        name: 'Chicken',
        expireDate: '03-16-2019',
        description: 'Fast food',
        userID: 'a2',
        imageURL: 'https://codingthesmartway.com/courses/nodejs/'
    }
]

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: { 
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
  }
});

module.exports = Query;