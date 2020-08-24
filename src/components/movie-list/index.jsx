/**
 * Movie Book - Application - movie-list Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";
import Table from "./../common/table";
import MovieInfo from "./../utils/movie-info";
import MoviePoster from "./../utils/movie-poster";
import MovieActions from "./../utils/movie-actions";

class MovieList extends Component {
  // table columns formation
  columns = [
    {
      key: "popularity",
      label: "Poster",
      sortable: true,
      content: (movie) => (
        <MoviePoster movie={movie} page={this.props.currentPage} />
      ),
    },
    {
      key: "title",
      label: "Information",
      sortable: true,
      content: (movie) => (
        <MovieInfo movie={movie} page={this.props.currentPage} />
      ),
    },
    {
      key: "required_actions",
      label: "Actions",
      sortable: false,
      content: (movie) => (
        <MovieActions
          movie={movie}
          onFavoriteUnfavorite={this.props.onFavoriteUnfavorite}
          onMovieWatchLater={this.props.onMovieWatchLater}
        />
      ),
    },
  ];

  // Render item list in a table
  render() {
    // render table
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        items={movies} // rows
        columns={this.columns} // columns
        onSort={onSort} // click event for sort
        sortColumn={sortColumn} // current sort settings
      />
    );
  }
}

export default MovieList;
