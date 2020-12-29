import "../Styles/App.css";
import Book from "./Book";

// this function will contain a form to capture user input
import React, { Component } from "react";

export default class App extends Component {
  // set up initial state in the constructor
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: "",
      sort: "",
      error: null,
    };
  }

  // create methods to update the state
  setSearch(search) {
    this.setState({
      search,
    });
  }

  setSort(sort) {
    this.setState({
      sort,
    });
  }

  render() {
    //map over all the books
    const books = this.state.books.map((book, i) => {
      return <Book {...book} key={i} />; // what is the spread operator doing here?????
    });

    return (
      <main className="App">
        <h1>NYT Best Sellers</h1>
        <div className="search">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            {/* on submit of the form call the handleSubmit function*/}
            <label htmlFor="search">Search: </label>
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              // on change of the input box call the setSearch function with a parameter of the selected value
              onChange={(e) => this.setSearch(e.target.value)}
            />
            <label htmlFor="sort">Sort: </label>
            <select
              id="sort"
              name="sort"
              // on chnage of the select call the setSort function with a parameter of the selected value
              onChange={(e) => this.setSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="title">Title</option>
              <option value="rank">Rank</option>
            </select>
            <button type="submit">Search</button>
          </form>
          {/* if an error occurs, render it here */}
          <div className="App_error">{this.state.error}</div>
        </div>
        {books}
      </main>
    );
  }
}
