import React from "react";
import Book from "./Book";

// Component that holds state and builds the full table
export default class BookTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "default",
      status: "NOT_STARTED"
    };
  }

  render() {
    let books = this.props.bookList;
    //console.log("Render - let 'books'");
    if (Array.isArray(books)) {
      console.log(books);
      return (
        <div>
          <h3>Search results for "{this.props.query}"</h3>
          <table id="reactBookTable">
            <tbody>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Number of Pages</th>
              </tr>
              {books.map((book, i) => (
                <Book
                  key={book.id}
                  url={book.volumeInfo.previewLink}
                  title={book.volumeInfo.title}
                  author={book.volumeInfo.authors}
                  pages={book.volumeInfo.pageCount}
                />
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      if (this.state.status === "NOT_STARTED") {
        return null;
      }
      return <h2>No books found.</h2>;
    }
  }
}
