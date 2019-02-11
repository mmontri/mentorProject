import React from "react";
import Book from "./Book";

// Component to render the sortable table header
class SortHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  // Creating a function to pass the sort value back to the Table component
  // Doing it this way to avoid re-renders that could have been
  // caused by putting an arrow function on the onClick itself
  handleClick = () => {
    this.props.onHeaderClick(this.props.value);
  };

  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        {this.props.text}
      </button>
    );
  }
}

// =========================================================================

// Component that holds state and builds the full table
export default class BookTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "default",
      status: "NOT_STARTED"
    };
  }

  // Function to change the sort method
  setSort = value => {
    this.setState({ sort: value });
  };

  // Function to return sorted book list
  sortBooks = () => {
    //First, create compare functions for each sort method
    function sortByTitle(a, b) {
      const bookA = a.volumeInfo.title.toUpperCase();
      const bookB = b.volumeInfo.title.toUpperCase();
      if (bookA > bookB) {
        return 1;
      } else {
        return -1;
      }
    }
    function sortByAuthors(a, b) {
      let bookA;
      let bookB;
      if (Array.isArray(a.volumeInfo.authors)) {
        bookA = a.volumeInfo.authors[0].toUpperCase();
      } else {
        bookA = "";
      }
      if (Array.isArray(b.volumeInfo.authors)) {
        bookB = b.volumeInfo.authors[0].toUpperCase();
      } else {
        bookB = "";
      }
      if (bookA > bookB) {
        return 1;
      } else {
        return -1;
      }
    }
    function sortByPages(a, b) {
      const bookA = a.volumeInfo.pageCount;
      const bookB = b.volumeInfo.pageCount;
      return bookA - bookB;
    }

    // Now look at the sort method and apply that sort.
    const books = this.props.bookList;
    console.log("Sort returned as " + this.state.sort);
    switch (this.state.sort) {
      case "title": {
        const sortedBooks = books.sort(sortByTitle);
        return sortedBooks;
      }
      case "author": {
        const sortedBooks = books.sort(sortByAuthors);
        return sortedBooks;
      }
      case "pages": {
        const sortedBooks = books.sort(sortByPages);
        return sortedBooks;
      }
      default:
        return books;
    }
  };

  render() {
    // <TODO:>Use state.sort to convert books to sortedBooks</TODO:>
    if (Array.isArray(this.props.bookList)) {
      const sortedBooks = this.sortBooks();
      console.log(sortedBooks);
      return (
        <div>
          <h3>Search results for "{this.props.query}"</h3>
          <table id="reactBookTable">
            <tbody>
              <tr>
                <th>
                  <SortHeader
                    value="title"
                    text="Title"
                    onHeaderClick={this.setSort}
                  />
                </th>
                <th>
                  <SortHeader
                    value="author"
                    text="Author"
                    onHeaderClick={this.setSort}
                  />
                </th>
                <th>
                  <SortHeader
                    value="pages"
                    text="Number of Pages"
                    onHeaderClick={this.setSort}
                  />
                </th>
              </tr>
              {sortedBooks.map((book, i) => (
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
