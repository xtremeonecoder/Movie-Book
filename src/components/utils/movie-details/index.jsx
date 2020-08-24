/**
 * Movie Book - Application - movie-details Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MovieDetailsInfo from "./../movie-details-info";
import { imagePath, imageNotFound } from "../../../config.json";

const MovieDetails = ({ movie, callbacks }) => {
  // return null if movie and callbacks are not defined
  if (!movie || !callbacks || !movie.id) return null;

  // get movie main poster
  let poster = null;
  const posters = movie.images.posters;
  if (movie.poster_path) {
    poster = movie.poster_path;
  } else if (posters.length > 0) {
    poster = posters[0].file_path;
  }

  // image url formation
  poster = poster ? `${imagePath}${poster}` : imageNotFound;

  // render movie details and main poster
  return (
    <div className="row" data-test="movieDetailsComponent">
      <div className="col-md-4">
        <div className="latest-movie">
          <Link to="#">
            <img
              data-test="moviePoster"
              src={poster}
              alt={movie.title}
              title={movie.title}
            />
          </Link>
        </div>
      </div>
      <div data-test="movieDetails" className="col-md-8">
        <MovieDetailsInfo movie={movie} callbacks={callbacks} />
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object,
  callbacks: PropTypes.object,
};

export default MovieDetails;
