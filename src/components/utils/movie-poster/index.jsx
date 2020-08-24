/**
 * Movie Book - Application - movie-poster Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { imagePath, imageNotFound } from "../../../config.json";

const MoviePoster = ({ movie, page }) => {
  // don't render component if movie and callbacks are invalid
  if (!movie || !page || !movie.id) return null;

  // get movie title
  const title = movie.title.replace("#", "");

  // prepare movie poster full url
  const movieUrl = `movie-info/${page}/${movie.id}/${title}`;
  let imageName = movie.poster_path ? movie.poster_path : movie.backdrop_path;
  imageName = imageName ? `${imagePath}${imageName}` : imageNotFound;

  // returns movie poster react component
  return (
    <Link data-test="moviePosterComponent" to={movieUrl}>
      <img
        data-test="moviePoster"
        style={{ width: "100px" }}
        src={imageName}
        alt={`${title}`}
        title={`${title}`}
      />
    </Link>
  );
};

MoviePoster.propTypes = {
  page: PropTypes.number,
  movie: PropTypes.object,
};

export default MoviePoster;
