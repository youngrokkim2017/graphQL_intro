const graphql = require('graphql');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
} = graphql;

const _ = require('lodash');

// test data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' }
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
]
//

const BookType = new GraphQLObjectType({ // defined object type, book
    name: 'Book',
    fields: () => ({
        // id: { type: GraphQLString },
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
});

const AuthorType = new GraphQLObjectType({ // defined object type, author
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
});

const RootQuery = new GraphQLObjectType({  // this is how you jump into the graph
    name: 'RootQueryType',
    fields: ({
        book: {
            type: BookType,
            // args: { id: { type: GraphQLString } },
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {  // tells graphql how to get the data when you make a request
                // code to get data from db / other source
                // use the id arg and find the book

                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});