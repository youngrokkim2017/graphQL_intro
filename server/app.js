const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({  // middleware
    schema,  // can use the schema to map out the map
    graphiql: true, // used for testing queries on server side
}));

app.listen(4000, () => {
    console.log("now listening for requests on port 4000")
});