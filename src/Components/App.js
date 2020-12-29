import React, { Component } from "react";
import "../Styles/App.css";
import Book from "./Book";

// this function will contain a form to capture user input

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

  handleSubmit(e) {
    // prevent default action of form submission
    e.preventDefault();

    //construct a URL with the query string
    const baseUrl = "http://localhost:8000/books";

    // construct the query parameters in the form search=title&sort=title
    const params = [];
    if (this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join("&");
    const url = `${baseUrl}?${query}`;

    // simple GET request using the fetch method
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      // set state with the new data is that is the response
      .then((data) => {
        this.setState({
          books: data,
          error: null, //reset errors
        });
      })
      // if there is an error, catch it and set state with the error
      .catch((err) => {
        this.setState({
          error: "Sorry, could not get books at this time.",
        });
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
