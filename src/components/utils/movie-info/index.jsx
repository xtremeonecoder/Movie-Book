/**
 * Movie Book - Application - movie-info Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import PropTypes from "prop-types";
import MovieLink from "./../movie-link";
import getLanguages from "../../../sources/languages";

const MovieInfo = ({ movie, page }) => {
  // don't render component if movie and callbacks are invalid
  if (!movie || !page || !movie.id) return null;

  // get languages
  const languages = getLanguages();

  // returns movie info react component
  return (
    <div data-test="movieInfoComponent">
      <MovieLink movie={movie} page={page} />
      <ul
        data-test="movieInfo"
        key={`movie-${movie.id}`}
        style={{ paddingLeft: 15 }}
      >
        {movie.popularity > 0 && (
          <li key={`info-${movie.id}-1`}>Popularity: {movie.popularity}</li>
        )}
        {movie.vote_count > 0 && (
          <li key={`info-${movie.id}-2`}>Vote Count: {movie.vote_count}</li>
        )}
        {movie.vote_average > 0 && (
          <li key={`info-${movie.id}-3`}>Average Vote: {movie.vote_average}</li>
        )}
        {movie.original_language !== "" && (
          <li key={`info-${movie.id}-4`}>
            Language: {languages[movie.original_language]}
          </li>
        )}
        {movie.release_date !== "" && (
          <li key={`info-${movie.id}-5`}>Release Date: {movie.release_date}</li>
        )}
      </ul>
    </div>
  );
};

MovieInfo.propTypes = {
  page: PropTypes.number,
  movie: PropTypes.object,
};

export default MovieInfo;
