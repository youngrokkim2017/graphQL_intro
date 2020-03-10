const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({ // defined object type, book
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({  // this is how you jump into the graph
    name: 'RootQueryType',
    fields: ({
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {  // tells graphql how to get the data when you make a request
                // code to get data from db / other source
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});