var { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
var Item = require('../models/item');
var db = require('../utils/database');

var refItems = db.ref("server/item");
       

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
            refItems.on("value", function(snapshot) {
                console.log(snapshot.val());
              }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
              });
        }
    },
  }
});

module.exports = Query;