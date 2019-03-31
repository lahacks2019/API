var express     					= require("express"),
    app         					= express(),
    bodyParser  					= require("body-parser"),
    graphqlHTTP 					= require("express-graphql"),
    express_graphql 				= require("express-graphql"),
//    cors            				= require('cors'),
	{ buildSchema, GraphQLSchema } 	= require("graphql"),
	Query 							= require('./actions/query'),
	Mutation 						= require('./actions/mutation');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use('/uploadImage', require('./utils/cloudVision'));

const schema = new GraphQLSchema({
   query: Query,
   mutation: Mutation
 });

// Create an express server and a GraphQL endpoint
app.all('/graphql', graphqlHTTP({
   schema,
   graphiql: true
 }));

app.listen(process.env.PORT, process.env.IP, () => console.log('Express GraphQL Server Now Running On hostname/graphql'));

// app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));