/**
 * Movie Book - Application - search-movies Component
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
import Search from "./../common/search";
import PageFooter from "./../layout/page-footer";
import StatusMessages from "./../utils/status-messages";

class SearchMovies extends Component {
  // Every time when setState function will be called
  // it will change state, and when state will be changed,
  // react will reload the render function.
  state = {
    keyword: "",
    search: "",
    movies: [],
    favorites: [],
    watchlists: [],
    currentPage: 1,
    itemPerPage: 20,
    totalPages: 0,
    totalCount: null,
    introduction: true,
    loadingImage: false,
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
    const { page, keyword } = queryString.parse(this.props.location.search);

    // this if-block executes for back to previous page link
    if (keyword) {
      // get movie search results
      const { data } = await service.getMovieSearchResults({
        keyword,
        page,
      });

      // extract required data from api request result
      // and set  extracted data and other necessary data into state
      const movies = data.results;
      const currentPage = data.page ? parseInt(data.page) : page;
      this.setState({ movies, keyword, currentPage });
    }
  }

  // this event function is raised inside Search component
  // and fires on search form submission to send api call request
  // to the server and to get api return values as response
  onSearch = async ({ keyword, page }) => {
    if (keyword) {
      // enable loading image and disable intro-message
      this.setState({ introduction: false, loadingImage: true, totalCount: 0 });

      // fetch movie search results
      const { data } = await service.getMovieSearchResults({
        keyword,
        page,
      });

      // get movies
      let movies = [];
      let { favorites, watchlists } = this.state;
      if (data && data.results) {
        data.results.map((movie) => {
          // initially set flag as false
          movie.favoriteFlag = false;
          movie.watchlistFlag = false;

          // set favorite movies as true
          favorites.find((id) => {
            if (movie.id === id) {
              movie.favoriteFlag = true;
              return movie;
            }
            return null;
          });

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
        //if (itemPerPage <= 0) itemPerPage = movies.length;
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
        keyword,
        currentPage,
        totalPages,
        totalCount,
        loadingImage: false,
      });
    }
  };

  // we will set keyword and current page, then
  // call onSearch function to execute the script
  handlePageChange = (page) => {
    this.onSearch({ keyword: this.state.keyword, page });
  };

  // set current sortColumn into state on sort
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // fires after add or remove favorite movie action done
  // this function has been used as callback in themoviedb-service.js file
  handleFavoriteUnfavorite = (movie) => {
    // clone state variables
    const movies = [...this.state.movies];
    let favorites = [...this.state.favorites];

    // find index of changed movie and update that
    const movieIndex = movies.indexOf(movie);
    movies[movieIndex].favoriteFlag = movie.favoriteFlag;

    // updating favorite movies
    if (movie.favoriteFlag) {
      // add movie to favorite list
      favorites.push(movie.id);
    } else {
      // remove movie from favorite list
      favorites = favorites.filter((favorite) => favorite !== movie.id);
    }

    // set component state
    this.setState({ movies, favorites });
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

  // set state on search
  handleSearch = ({ currentTarget: search }) => {
    this.setState({ search: search.value });
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

  // render movie search results
  render() {
    // destructure state
    const {
      keyword,
      sortColumn,
      currentPage,
      itemPerPage,
      totalCount,
      introduction,
      loadingImage,
    } = this.state;

    // get result
    const movies = this.getResult();

    // pagination needed?
    let paginationNeeded = false;
    if (totalCount > itemPerPage) paginationNeeded = true;

    // render movie search results
    return (
      <div id="site-content">
        <main className="main-content">
          <div className="container">
            <div className="page">
              <div className="row">
                <div className="col">
                  <Search onSearch={this.onSearch} keyword={keyword} />
                  <StatusMessages
                    totalCount={totalCount}
                    introduction={introduction}
                    loadingImage={loadingImage}
                  />

                  {totalCount > 0 && (
                    <React.Fragment>
                      <h4>Total {totalCount} movie(s) found!</h4>
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
                        forWord={keyword}
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

export default SearchMovies;
