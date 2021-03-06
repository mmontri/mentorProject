import React from "react";
import Book from "./Book";

// Component to render the sortable table header
class SortHeader extends React.Component {
  // Creating a function to pass the sort value back to the Table component
  // Doing it this way to avoid re-renders that could have been
  // caused by putting an arrow function on the onClick itself
  handleClick = () => {
    this.props.onHeaderClick(this.props.value);
  };

  render() {
    const isActive = this.props.value === this.props.active;

    const activeClass = isActive ? "active" : "";
    const arrow = this.props.sortAscending ? "▲" : "▼";

    return (
      <button
        type="button"
        className={"btn-flat " + activeClass}
        onClick={this.handleClick}
      >
        {this.props.text}
        {isActive ? arrow : ""}
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
      sortCol: "default",
      sortAscending: true,
      status: "NOT_STARTED"
    };
  }

  // Function to change the sort method
  setSort = value => {
    if (value === this.state.sortCol) {
      // The sort is already set to this. Toggle between ascending and descending
      const newSortDirection = !this.state.sortAscending;
      this.setState({ sortAscending: newSortDirection });
    } else {
      // We're changing the column, so set it AND set to ascending
      this.setState({ sortCol: value, sortAscending: true });
    }
  };

  // Function that switches between ascending and descending sort.
  applySortOrder(bookArr) {
    if (this.state.sortAscending) {
      return bookArr.reverse();
    } else {
      return bookArr;
    }
  }

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
      } else if (bookB < bookA) {
        return -1;
      } else {
        return 0;
      }
    }
    function sortByPages(a, b) {
      const bookA = a.volumeInfo.pageCount;
      const bookB = b.volumeInfo.pageCount;
      return bookA - bookB;
    }

    // Now look at the sort method and apply that sort.
    const books = this.props.bookList.slice();
    switch (this.state.sortCol) {
      case "title": {
        return this.applySortOrder(books.sort(sortByTitle));
      }
      case "author": {
        return this.applySortOrder(books.sort(sortByAuthors));
      }
      case "pages": {
        return this.applySortOrder(books.sort(sortByPages));
      }
      default:
        return books;
    }
  };

  render() {
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
                    active={this.state.sortCol}
                    sortAscending={this.state.sortAscending}
                    onHeaderClick={this.setSort}
                  />
                </th>
                <th>
                  <SortHeader
                    value="author"
                    text="Author"
                    active={this.state.sortCol}
                    sortAscending={this.state.sortAscending}
                    onHeaderClick={this.setSort}
                  />
                </th>
                <th>
                  <SortHeader
                    value="pages"
                    text="Number of Pages"
                    active={this.state.sortCol}
                    sortAscending={this.state.sortAscending}
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
