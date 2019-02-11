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
      <div id="search">
        <form id="searchform" onSubmit={this.handleSearch}>
          <label htmlFor="searchField">Keyword search:</label>
          <input
            name="searchField"
            id="searchField"
            type="search"
            onChange={this.handleChange}
          />
          <button
            id="search"
            type="submit"
            className="btn-large waves-effect waves-light"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
