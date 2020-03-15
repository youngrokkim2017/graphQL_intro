// import React, { Component } from "react";
import React from "react";
// import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo'; // this helps bing apollo to react

// // Add a query, like in graphql
// const getBooksQuery = gql`
//     {
//         books {
//             name
//             id
//         }
//     }
// `

import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

class BookList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        }
    }

    displayBooks() {
        var data = this.props.data;

        if (data.loading) {
            return (
                <div>Loading books...</div>
            );
        } else {
            return data.books.map(book => {
                return (
                    <li 
                        key={book.id}
                        onClick={(e) => {this.setState({ selected: book.id })}}
                    >
                        {book.name}
                    </li>
                )
            });
        }
    }

    render() {
        // console.log(this.props);

        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookId={this.state.selected} />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);
