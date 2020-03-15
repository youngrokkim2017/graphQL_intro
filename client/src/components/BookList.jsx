// import React, { Component } from "react";
import React from "react";
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo'; // this helps bing apollo to react

// Add a query, like in graphql
const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

class BookList extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        console.log(this.props);
        return (
            <div>
                <ul id="book-list">
                    <li>
                        Book name
                    </li>
                </ul>
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);
