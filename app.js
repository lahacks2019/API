var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    graphqlHTTP = require("express-graphql");
    express_graphql = require("express-graphql")
var { buildSchema, GraphQLSchema } = require("graphql");

var Query = require('./actions/query');
var Mutation = require('./actions/mutation');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// GraphQL schema - test/remove later
const schema = new GraphQLSchema({
   query: Query,
   mutation: Mutation
 });

// Create an express server and a GraphQL endpoint
var app = express();
app.all('/graphql', graphqlHTTP({
   schema,
   graphiql: true
 }));

app.listen(process.env.PORT, process.env.IP, () => console.log('Express GraphQL Server Now Running On hostname/graphql'));

