const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connecting to mongoDB
mongoose.connect('add mongoDB string here');
mongoose.connection.once('open', () => {  // event listener
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({  // middleware
    schema,  // can use the schema to map out the map
    graphiql: true, // used for testing queries on server side
}));

app.listen(4000, () => {
    console.log("now listening for requests on port 4000")
});