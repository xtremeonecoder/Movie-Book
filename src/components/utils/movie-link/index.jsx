/**
 * Movie Book - Application - movie-link Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieLink = ({ movie, page }) => {
  // don't render component if movie and callbacks are invalid
  if (!movie || !page || !movie.id) return null;

  // get movie title
  const title = movie.title.replace("#", "");

  // prepare movie details page url
  const movieUrl = `movie-info/${page}/${movie.id}/${title}`;
  const movieTitle = movie.title ? movie.title : movie.original_title;

  // returns movie link react component
  return (
    <Link data-test="movieLinkComponent" to={movieUrl}>
      {movieTitle}
    </Link>
  );
};

MovieLink.propTypes = {
  page: PropTypes.number,
  movie: PropTypes.object,
};

export default MovieLink;
