/**
 * Movie Book - Application - movie-details-info Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import PropTypes from "prop-types";
import MovieActions from "./../movie-actions";
import getLanguages from "../../../sources/languages";

const MovieDetailsInfo = ({ movie, callbacks }) => {
  // don't render component if movie and callbacks are invalid
  if (!movie || !callbacks || !movie.id) return null;

  // get languages
  const languages = getLanguages();

  // prepare some movie information
  // movie genres, production countries, production companies
  const genres = [];
  const countries = [];
  const companies = [];
  movie.genres.map((genre) => genres.push(genre.name));
  movie.production_countries.map((country) => countries.push(country.name));
  movie.production_companies.map((company) => companies.push(company.name));

  // prepare proper movie title
  const movieTitle = movie.title ? movie.title : movie.original_title;

  // returns movie details info react component
  return (
    <div data-test="movieDetailsInfoComponent">
      {movieTitle !== "" && (
        <h2 data-test="movieTitle" className="section-title">
          {movieTitle}
        </h2>
      )}
      {movie.tagline !== "" && (
        <p data-test="movieTagline" className="movie-tagline">
          {movie.tagline}
        </p>
      )}
      {movie.overview !== "" && (
        <p data-test="movieOverview" style={{ textAlign: "justify" }}>
          {movie.overview}
        </p>
      )}
      <ul
        data-test="movieDetails"
        className="movie-schedule"
        key={`movie-details-${movie.id}`}
        style={{ paddingLeft: 15 }}
      >
        {movie.popularity > 0 && (
          <li key={`movie-details-${movie.id}-1`}>
            <strong>Popularity:</strong> {movie.popularity},
            <div className="movie-details-actions">
              <MovieActions
                movie={movie}
                onFavoriteUnfavorite={callbacks.favoriteUnfavoriteCB}
                onMovieWatchLater={callbacks.addRemoveWatchlistCB}
              />
            </div>
          </li>
        )}
        {movie.vote_count > 0 && (
          <li key={`movie-details-${movie.id}-2`}>
            <strong>Vote Count:</strong> {movie.vote_count}
          </li>
        )}
        {movie.vote_average > 0 && (
          <li key={`movie-details-${movie.id}-3`}>
            <strong>Average Vote:</strong> {movie.vote_average}
          </li>
        )}
        {movie.original_language !== "" && (
          <li key={`movie-details-${movie.id}-4`}>
            <strong>Language:</strong> {languages[movie.original_language]}
          </li>
        )}
        {movie.release_date !== "" && (
          <li key={`movie-details-${movie.id}-5`}>
            <strong>Release Date:</strong> {movie.release_date}
          </li>
        )}
        {countries.length > 0 && (
          <li key={`movie-details-${movie.id}-6`}>
            <strong>Production Countries:</strong> {countries.join(", ")}
          </li>
        )}
        {genres.length > 0 && (
          <li key={`movie-details-${movie.id}-7`}>
            <strong>Movie Genres:</strong> {genres.join(", ")}
          </li>
        )}
        {companies.length > 0 && (
          <li key={`movie-details-${movie.id}-8`}>
            <strong>Production Companies:</strong> {companies.join(", ")}
          </li>
        )}
      </ul>
    </div>
  );
};

MovieDetailsInfo.propTypes = {
  movie: PropTypes.object,
  callbacks: PropTypes.object,
};

export default MovieDetailsInfo;
