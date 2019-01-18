import React from "react";
import ReactDOM from "react-dom";

import SearchField from "./components/SearchField";

import "./styles.css";

// Component to render each row of the table
function Book(props) {
  // Parse authors array into comma separated list
  const authors = props.author.join(", ");
  return (
    <tr>
      <td className="title">{props.title}</td>
      <td className="author">{authors}</td>
      <td className="pages">{props.pages}</td>
    </tr>
  );
}

// Component that holds state and builds the full table
class BookTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "default",
      bookList: {},
      status: "NOT_STARTED"
    };
    // Calling this in the render method was causing a loop, so it's moved here.
    this.getBookList(props.query);
  }

  // Function to call the API
  // Accepts a search query string
  // On success, sets state.bookList
  getBookList = query => {
    const self = this;
    let request = new XMLHttpRequest();
    let apiUrl =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      query +
      "&fields=kind,items(id,volumeInfo(title,authors,pageCount,publishedDate))";

    request.open("GET", apiUrl, true);
    request.onload = function() {
      console.log("Response status: " + this.status);
      //console.log("Response status: " + this.status);
      if (this.status >= 200 && this.status < 400) {
        // Success!
        let response = this.response;
        const bookList = JSON.parse(response);
        // Setting state here forces re-render. No need to return or send any data elsewhere
        self.setState({ bookList: bookList });
      } else {
        // We reached our target server, but it returned an error
        console.log("Reached server but it returned an error.");
      }
    };
    request.send();
  };

  render() {
    let books = this.state.bookList.items;
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
      // This flickers every render while the AJAX call is made.
      // How do I avoid that?
      if (this.state.status === "NOT_STARTED") {
        return null;
      }

      return <h2>No books found.</h2>;
    }
  }
}

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "flyfishing"
    };
  }

  handleSearch = newSearchQuery => {
    this.setState({ query: newSearchQuery });
    // I can't figure out how to pass something to this function
    // newSearchQuery seems to be the actual click event
    console.log("click passed", newSearchQuery);
  };

  render() {
    return (
      <div id="bookTable">
        <SearchField onSearch={this.handleSearch} />
        <BookTable query={this.state.query} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<BookSearch />, document.getElementById("bookSearch"));
