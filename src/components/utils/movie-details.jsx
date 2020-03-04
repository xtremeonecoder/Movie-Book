/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { Link } from "react-router-dom";
import { imagePath } from "../../config.json";
import { getMovieDetailsInfo } from "../../services/themoviedb-service";

const MovieDetails = ({ movie, callbacks }) => {
  // return null if movie is not valid
  if (!movie.id) return null;

  // get movie main poster
  let poster = null;
  const posters = movie.images.posters;
  if (movie.poster_path) {
    poster = movie.poster_path;
  } else if (posters.length > 0) {
    poster = posters[0].file_path;
  }

  // image url formation
  poster = poster
    ? `${imagePath}${poster}`
    : `/theme/images/image-not-found.jpg`;

  // render movie details and main poster
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="latest-movie">
          <Link to="#">
            <img src={poster} alt={movie.title} title={movie.title} />
          </Link>
        </div>
      </div>
      <div className="col-md-8">{getMovieDetailsInfo(movie, callbacks)}</div>
    </div>
  );
};

export default MovieDetails;
