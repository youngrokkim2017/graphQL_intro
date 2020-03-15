import React, { Component } from "react";

class BookList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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

export default BookList;
