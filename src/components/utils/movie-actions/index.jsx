/**
 * Movie Book - Application - movie-actions Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import PropTypes from "prop-types";
import Favorite from "./../../common/favorite";
import WatchLater from "./../../common/watch-later";
import service from "./../../../services/themoviedb-service";

const MovieActions = (props) => {
  // get props data
  const movie = props.movie;
  const movieSearchWatchCB = props.onMovieWatchLater;
  const movieSearchFavoriteCB = props.onFavoriteUnfavorite;

  // don't render the component if props are missing
  if (!movie || !movieSearchWatchCB || !movieSearchFavoriteCB) return null;

  // returns movie actions react component
  return (
    <ul
      data-test="movieActionList"
      className="movie-actions"
      key={`action-${movie.id}`}
    >
      <li key={`action-${movie.id}-1`}>
        <Favorite
          movie={movie}
          movieSearchFavoriteCB={movieSearchFavoriteCB}
          onFavoriteUnfavorite={service.handleFavoriteUnfavorite}
        />
      </li>
      <li key={`action-${movie.id}-2`}>
        <WatchLater
          movie={movie}
          movieSearchWatchCB={movieSearchWatchCB}
          onMovieWatchLater={service.handleMovieWatchLater}
        />
      </li>
    </ul>
  );
};

MovieActions.propTypes = {
  movie: PropTypes.object,
  onMovieWatchLater: PropTypes.func,
  onFavoriteUnfavorite: PropTypes.func,
};

export default MovieActions;
