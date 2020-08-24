/**
 * Movie Book - Application - favorite-movies Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";
import queryString from "query-string";
import Pagination from "react-js-pagination";
import _ from "lodash";
import service from "./../../services/themoviedb-service";
import { pagination } from "./../utils/pagination";
import MovieList from "./../movie-list";
import PageFooter from "./../layout/page-footer";

class FavoriteMovies extends Component {
  // Every time when setState function will be called
  // it will change state, and when state will be changed,
  // react will reload the render function.
  state = {
    movies: [],
    favorites: [],
    watchlists: [],
    currentPage: 1,
    itemPerPage: 0,
    totalPages: 0,
    totalCount: 0,
    sortColumn: { key: "title", order: "asc" },
  };

  // We will pull the movies data only once
  // If we put these in state, every time onSetState
  // it will pull the movies again and again
  async componentDidMount() {
    // set favorites and watchlists in state
    const favorites = await service.getFavoriteMoviesAll({ page: 1 });
    const watchlists = await service.getWatchlistMoviesAll({ page: 1 });
    this.setState({ favorites, watchlists });

    // get query string values
    let { page } = queryString.parse(this.props.location.search);
    if (!page) page = 1;
    this.loadFavoriteMovies({ page });
  }

  // this event function is raised inside Search component
  // and fires on search form submission to send api call request
  // to the server and to get api return values as response
  loadFavoriteMovies = async ({ page }) => {
    if (page) {
      // enable loading image
      this.setState({ totalCount: 0 });

      // fetch favorite movie results
      const { data } = await service.getFavoriteMovies({ page });

      // get movies
      let movies = [];
      let { itemPerPage, watchlists } = this.state;
      if (data && data.results) {
        data.results.map((movie) => {
          // initially set favorite flag as true
          movie.favoriteFlag = true;
          // initially set watchlist flag as false
          movie.watchlistFlag = false;

          // set watchlist movies as true
          watchlists.find((id) => {
            if (movie.id === id) {
              movie.watchlistFlag = true;
              return movie;
            }
            return null;
          });

          // push item to movies array
          movies.push(movie);
          return movies;
        });

        // set items-per-page, only if it is less than or equal to '0'
        if (itemPerPage <= 0) itemPerPage = movies.length;
      }

      // calculating value for state variables
      const currentPage = data && data.page ? parseInt(data.page) : page;
      const totalPages =
        data && data.total_pages ? parseInt(data.total_pages) : 0;
      const totalCount =
        data && data.total_results ? parseInt(data.total_results) : 0;

      // set state
      this.setState({
        movies,
        currentPage,
        itemPerPage,
        totalPages,
        totalCount,
      });
    }
  };

  // we will set keyword and current page, then
  // call onSearch function to execute the script
  handlePageChange = (page) => {
    this.loadFavoriteMovies({ page });
  };

  // set current sortColumn into state on sort
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // fires after add or remove favorite movie action done
  // this function has been used as callback in themoviedb-service.js file
  handleFavoriteUnfavorite = (movie) => {
    // clone state variables
    let movies = [...this.state.movies];
    let favorites = [...this.state.favorites];

    // favorite movie count decrement
    const totalCount = this.state.totalCount - 1;
    // remove movie from favorite list
    movies = movies.filter((m) => m.id !== movie.id);
    // remove movie-id from favorite list
    favorites = favorites.filter((favorite) => favorite !== movie.id);

    // set component state
    this.setState({ movies, favorites, totalCount });
  };

  // fires after add or remove watchlist movie action done
  // this function has been used as callback in themoviedb-service.js file
  handleMovieWatchLater = (movie) => {
    // clone state variables
    const movies = [...this.state.movies];
    let watchlists = [...this.state.watchlists];

    // find index of changed movie and update that
    const movieIndex = movies.indexOf(movie);
    movies[movieIndex].watchlistFlag = movie.watchlistFlag;

    // updating watchlist movies
    if (movie.watchlistFlag) {
      // add movie to watchlist
      watchlists.push(movie.id);
    } else {
      // remove movie from watchlist
      watchlists = watchlists.filter((watchlist) => watchlist !== movie.id);
    }

    // set component state
    this.setState({ movies, watchlists });
  };

  // prepare data for rendering
  getResult = () => {
    // destructuring state
    let { movies: perPageMovies, sortColumn, itemPerPage } = this.state;

    // sort data as per table header
    const sortedMovies = _(perPageMovies).orderBy(
      [sortColumn.key],
      [sortColumn.order]
    );

    // get paginated items
    return pagination(sortedMovies, itemPerPage);
  };

  render() {
    // destructure state
    const { sortColumn, currentPage, itemPerPage, totalCount } = this.state;

    // get result
    const movies = this.getResult();

    // pagination needed?
    let paginationNeeded = false;
    if (totalCount > itemPerPage) paginationNeeded = true;

    // render favorite movies
    return (
      <div id="site-content">
        <main className="main-content">
          <div className="container">
            <div className="page">
              <div className="row">
                <div className="col">
                  {totalCount <= 0 && (
                    <div className="fa-5x">
                      <i className="fa fa-cog fa-spin"></i>
                    </div>
                  )}
                  {totalCount > 0 && (
                    <React.Fragment>
                      <h4>Total {totalCount} favorite movie(s) found!</h4>
                      {paginationNeeded !== false && (
                        <Pagination
                          totalItemsCount={totalCount}
                          activePage={currentPage}
                          itemsCountPerPage={itemPerPage}
                          onChange={this.handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      )}
                      <MovieList
                        movies={movies}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                        currentPage={currentPage}
                        onMovieWatchLater={this.handleMovieWatchLater}
                        onFavoriteUnfavorite={this.handleFavoriteUnfavorite}
                      />
                      {paginationNeeded !== false && (
                        <Pagination
                          totalItemsCount={totalCount}
                          activePage={currentPage}
                          itemsCountPerPage={itemPerPage}
                          onChange={this.handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <PageFooter />
      </div>
    );
  }
}

export default FavoriteMovies;
