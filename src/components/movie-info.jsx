/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";
import PageFooter from "./layout/page-footer";
import Slider from "./utils/slider";
import Video from "./utils/video";
import MovieDetails from "./utils/movie-details";
import service from "../services/themoviedb-service";

class MovieInfo extends Component {
  state = {
    movie: {},
    posters: [],
    backdrops: [],
    videos: [],
    favorites: [],
    watchlists: []
  };

  async componentDidMount() {
    // get url parameters using object destructuring
    let { movie_id } = this.props.match.params;

    // send api request to server and get response data
    const { data: movie } = await service.getMovieDetails(movie_id);

    // set favorites and watchlists in state
    const favorites = await service.getFavoriteMoviesAll({ page: 1 });
    const watchlists = await service.getWatchlistMoviesAll({ page: 1 });

    // initially set flag as false
    movie.favoriteFlag = false;
    movie.watchlistFlag = false;

    // set favorite movies as true
    favorites.find(id => {
      if (movie.id === id) {
        movie.favoriteFlag = true;
        return movie;
      }
      return null;
    });

    // set watchlist movies as true
    watchlists.find(id => {
      if (movie.id === id) {
        movie.watchlistFlag = true;
        return movie;
      }
      return null;
    });

    // set state
    const videos = movie.videos.results;
    const { posters, backdrops } = movie.images;
    this.setState({
      movie,
      favorites,
      watchlists,
      videos,
      posters,
      backdrops
    });
  }

  // callback on favorite or unfavorite
  favoriteUnfavoriteCB = newMovie => {
    // clone state variables
    const movie = this.state.movie;
    let favorites = [...this.state.favorites];

    // update the favorite flag of the movie
    movie.favoriteFlag = newMovie.favoriteFlag;

    // updating favorite movies
    if (newMovie.favoriteFlag) {
      // add movie to favorite list
      favorites.push(newMovie.id);
    } else {
      // remove movie from favorite list
      favorites = favorites.filter(favorite => favorite !== newMovie.id);
    }

    // set component state
    this.setState({ movie, favorites });
  };

  //callback on add or remove watchlist
  addRemoveWatchlistCB = newMovie => {
    // clone state variables
    const movie = this.state.movie;
    let watchlists = [...this.state.watchlists];

    // update the watchlist flag of the movie
    movie.watchlistFlag = newMovie.watchlistFlag;

    // updating watchlist movies
    if (newMovie.watchlistFlag) {
      // add movie to watchlist
      watchlists.push(newMovie.id);
    } else {
      // remove movie from watchlist
      watchlists = watchlists.filter(watchlist => watchlist !== newMovie.id);
    }

    // set component state
    this.setState({ movie, watchlists });
  };

  // render movie details information
  render() {
    // destructure the state values
    const { movie, posters, backdrops, videos } = this.state;

    // get url parameters value using object destructuring
    // const { keyword, base, page } = this.props.match.params;

    // callbacks
    const favoriteUnfavoriteCB = this.favoriteUnfavoriteCB;
    const addRemoveWatchlistCB = this.addRemoveWatchlistCB;

    return (
      <div id="site-content">
        <main className="main-content">
          <div className="container">
            <div className="page">
              {!movie.id && (
                <div className="fa-5x">
                  <i className="fa fa-cog fa-spin"></i>
                </div>
              )}
              {movie.id > 0 && (
                <React.Fragment>
                  <MovieDetails
                    movie={movie}
                    callbacks={{ favoriteUnfavoriteCB, addRemoveWatchlistCB }}
                  />
                  <Slider posters={posters} backdrops={backdrops} />
                  <Video videos={videos} />
                </React.Fragment>
              )}
            </div>
          </div>
        </main>
        <PageFooter />
      </div>
    );
  }
}

export default MovieInfo;
