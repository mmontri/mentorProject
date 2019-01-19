import React from "react";
import ReactDOM from "react-dom";

import SearchField from "./components/SearchField";
import BookTable from "./components/BookTable";

import "./styles.css";

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      bookList: {}
    };
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
      "&fields=kind,items(id,volumeInfo(title,authors,pageCount,publishedDate,previewLink))";

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

  handleSearch = newSearchQuery => {
    console.log("click passed", newSearchQuery);
    this.getBookList(newSearchQuery);
    this.setState({ query: newSearchQuery });
  };

  render() {
    return (
      <div id="bookTable">
        <SearchField onSearch={this.handleSearch} />
        <BookTable
          query={this.state.query}
          bookList={this.state.bookList.items}
        />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<BookSearch />, document.getElementById("bookSearch"));
