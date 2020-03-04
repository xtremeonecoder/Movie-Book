/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";

class Search extends Form {
  state = {
    data: { keyword: "", page: 1 }
  };

  // define validation schema for search form
  schema = {
    keyword: Joi.string()
  };

  // fires on component loading
  componentDidMount() {
    // get props data
    const { keyword } = this.props;
    //console.log("Search-word: ", keyword);
    this.setState({ data: { keyword } });
  }

  // fires on submission of search form
  doSubmit = () => {
    // here I raised the event which is defined
    // in the parent component of this component
    this.props.onSearch(this.state.data);
  };

  // render search widget
  render() {
    // get state data by destructuring
    const { keyword } = this.state.data;

    return (
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline" onSubmit={this.handleSubmission}>
          <input
            className="form-control mr-sm-2"
            type="search"
            name="keyword"
            value={keyword}
            placeholder="Search Movies"
            aria-label="Search Movies"
            onChange={this.handleChange}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </nav>
    );
  }
}

export default Search;
