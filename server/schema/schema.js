const graphql = require('graphql');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull, // this says a certain field is required
} = graphql;

const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

// // test data
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' },
// ]
// //

const BookType = new GraphQLObjectType({ // defined object type, book
    name: 'Book',
    fields: () => ({
        // id: { type: GraphQLString },
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors, { id: parent.authorId });

                // this will look through the author collection and find it by id
                return Author.findById(parent.authorId);
            }
        },
    })
});

const AuthorType = new GraphQLObjectType({ // defined object type, author
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorId: parent.id })

                // find looks through the book collection with the conditions
                return Book.find({ authorId: parent.id })
            }
        }
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

                // return _.find(books, { id: args.id });

                // find a book based on its id
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id });

                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books

                // when you used the .find without arguments, it returns all 
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors

                return Author.find({});
            }
        }
    })
});

const Mutation = new GraphQLObjectType({  // when you need to specify NON NULL
    name: 'Mutation',
    fields: ({
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                // this is our author model
                let author = new Author({  
                    name: args.name,
                    age: args.age
                });

                return author.save();
            },
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, arges) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: this.args.authorId
                });

                return book.save();
            },
        },
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});