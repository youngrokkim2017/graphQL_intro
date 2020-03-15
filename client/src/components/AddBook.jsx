// import React, { Component } from "react";
import React from "react";
// import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo'; // this helps bing apollo to react

// // Add a query, like in graphql
// const getAuthorsQuery = gql`
//     {
//         authors {
//             name
//             id
//         }
//     }
// `

import { getAuthorsQuery, addBookMutation } from "../queries/queries";

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            genre: "",
            authorId: "",
        };
    }

    displayAuthors() {
        // var data = this.props.data;
        var data = this.props.getAuthorsQuery;
        // console.log(this.props);

        if (data.loading) {
            return (
                <option disabled>Loading Authors...</option>
            )
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>
                        author.name
                    </option>
                )
            });
        }
    }

    submitForm(e) {
        e.preventDefault();

        // console.log(this.state);

        this.props.addBookMutation();
    }

    render() {
        return (
            <form 
                id="add-book"
                onSubmit={this.submitForm.bind(this)}
            >
                <div className="field">
                    <label>Book name:</label>
                    <input 
                        type="text" 
                        onChange={(e) => this.setState({ name: e.target.value })} 
                    />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input 
                        type="text"
                        onChange={(e) => this.setState({ genre: e.target.value })}
                    />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

// export default graphql(getAuthorsQuery)(AddBook);
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);