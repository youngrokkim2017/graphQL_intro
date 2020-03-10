const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const _ = require('lodash');

// test data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' }
];
//

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

                // use the id arg and find the book

                return _.find(books, { id: args.id });
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});