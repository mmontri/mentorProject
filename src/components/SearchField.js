import React from "react";

// Component to render search field
export default class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.initialQuery
    };
  }

  handleChange = e => {
    let searchValue = e.target.value;
    //console.log("new", searchValue);
    this.setState({ query: searchValue });
    //console.log("Yo");
  };

  handleSearch = e => {
    this.props.onSearch(this.state.query);
    e.preventDefault();
  };

  render() {
    // console.log("At render, SearchField.state.query is " + this.state.query);
    return (
      <div id="searchform">
        <form onSubmit={this.handleSearch}>
          <label htmlFor="search">Keyword search:</label>
          <input
            name="search"
            id="search"
            type="text"
            onChange={this.handleChange}
          />
          <button id="search" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}
