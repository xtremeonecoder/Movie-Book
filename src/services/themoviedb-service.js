/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import http from "./http-service";
import getLanguages from "../sources/languages";
import Favorite from "../components/common/favorite";
import WatchLater from "../components/common/watch-later";
import { apiUrl, apiKey, imagePath, sessionId } from "../config.json";

// get languages
const languages = getLanguages();

// sends api http request to server
// and get api http response result from server
export function getMovieSearchResults(query) {
  try {
    const page = query.page ? query.page : 1;
    let searchMoviesEndPoint = apiUrl + "/search/movie";
    const queryString = `api_key=${apiKey}&query=${query.keyword}&language=en-US&include_adult=false&page=${page}`;

    searchMoviesEndPoint = `${searchMoviesEndPoint}?${queryString}`;
    return http.get(searchMoviesEndPoint);
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// sends api http request to server
// and get api http response result from server
export function getFavoriteMovies(query) {
  try {
    const page = query.page ? query.page : 1;
    let favoriteMoviesEndPoint = apiUrl + "/account/0/favorite/movies";
    const queryString = `api_key=${apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${page}`;

    favoriteMoviesEndPoint = `${favoriteMoviesEndPoint}?${queryString}`;
    return http.get(favoriteMoviesEndPoint);
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// sends api http request to server
// and get api http response result from server
export async function getFavoriteMoviesAll(query) {
  try {
    const favoriteMovies = [];
    const { data } = await getFavoriteMovies(query);
    let results = data.results;
    const totalPages = parseInt(data.total_pages);
    for (let i = 1; i <= totalPages; i++) {
      if (i > 1) {
        query.page = i;
        const { data } = await getFavoriteMovies(query);
        results = data.results;
      }
      results.map(({ id }) => favoriteMovies.push(id));
    }

    return favoriteMovies;
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// sends api http request to server
// and get api http response result from server
export function getWatchlistMovies(query) {
  try {
    const page = query.page ? query.page : 1;
    let watchlistMoviesEndPoint = apiUrl + "/account/0/watchlist/movies";
    const queryString = `api_key=${apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${page}`;

    watchlistMoviesEndPoint = `${watchlistMoviesEndPoint}?${queryString}`;
    return http.get(watchlistMoviesEndPoint);
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// sends api http request to server
// and get api http response result from server
export async function getWatchlistMoviesAll(query) {
  try {
    const watchlistMovies = [];
    const { data } = await getWatchlistMovies(query);
    let results = data.results;
    const totalPages = parseInt(data.total_pages);
    for (let i = 1; i <= totalPages; i++) {
      if (i > 1) {
        query.page = i;
        const { data } = await getWatchlistMovies(query);
        results = data.results;
      }
      results.map(({ id }) => watchlistMovies.push(id));
    }

    return watchlistMovies;
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// sends api http request to server
// and get api http response result from server
export function getMovieDetails(movieId) {
  try {
    if (!movieId) return null;
    let movieDetailsEndPoint = `${apiUrl}/movie/${movieId}`;
    const queryString = `api_key=${apiKey}&append_to_response=videos,images`;

    movieDetailsEndPoint = `${movieDetailsEndPoint}?${queryString}`;
    return http.get(movieDetailsEndPoint);
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// returns movie-poster of a particular movie
export function getMoviePoster(movie, page) {
  try {
    const title = movie.title.replace("#", "");
    const movieUrl = `movie-info/${page}/${movie.id}/${title}`;
    let imageName = movie.poster_path ? movie.poster_path : movie.backdrop_path;
    imageName = imageName
      ? `${imagePath}${imageName}`
      : `/theme/images/image-not-found.jpg`;
    return (
      <Link to={movieUrl}>
        <img
          style={{ width: "100px" }}
          src={imageName}
          alt={`${title}`}
          title={`${title}`}
        />
      </Link>
    );
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// returns movie-link of a particular movie
export function getMovieLink(movie, page) {
  try {
    const title = movie.title.replace("#", "");
    const movieUrl = `movie-info/${page}/${movie.id}/${title}`;
    const movieTitle = movie.title ? movie.title : movie.original_title;
    return <Link to={movieUrl}>{movieTitle}</Link>;
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// returns movie brief informatin of a particular movie
export function getMovieInfo(movie, page) {
  try {
    return (
      <React.Fragment>
        {getMovieLink(movie, page)}
        <ul key={`movie-${movie.id}`} style={{ paddingLeft: 15 }}>
          {movie.popularity > 0 && (
            <li key={`info-${movie.id}-1`}>Popularity: {movie.popularity}</li>
          )}
          {movie.vote_count > 0 && (
            <li key={`info-${movie.id}-2`}>Vote Count: {movie.vote_count}</li>
          )}
          {movie.vote_average > 0 && (
            <li key={`info-${movie.id}-3`}>
              Average Vote: {movie.vote_average}
            </li>
          )}
          {movie.original_language !== "" && (
            <li key={`info-${movie.id}-4`}>
              Language: {languages[movie.original_language]}
            </li>
          )}
          {movie.release_date !== "" && (
            <li key={`info-${movie.id}-5`}>
              Release Date: {movie.release_date}
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// returns movie details informatin of a particular movie
export function getMovieDetailsInfo(movie, callbacks) {
  try {
    const genres = [];
    const countries = [];
    const companies = [];
    movie.genres.map(genre => genres.push(genre.name));
    movie.production_countries.map(country => countries.push(country.name));
    movie.production_companies.map(company => companies.push(company.name));

    const movieTitle = movie.title ? movie.title : movie.original_title;
    return (
      <React.Fragment>
        {movieTitle !== "" && <h2 className="section-title">{movieTitle}</h2>}
        {movie.tagline !== "" && (
          <p className="movie-tagline">{movie.tagline}</p>
        )}
        {movie.overview !== "" && (
          <p style={{ textAlign: "justify" }}>{movie.overview}</p>
        )}
        <ul
          className="movie-schedule"
          key={`movie-details-${movie.id}`}
          style={{ paddingLeft: 15 }}
        >
          {movie.popularity > 0 && (
            <li key={`movie-details-${movie.id}-1`}>
              <strong>Popularity:</strong> {movie.popularity},
              <div className="movie-details-actions">
                {getMovieActions(
                  movie,
                  callbacks.favoriteUnfavoriteCB,
                  callbacks.addRemoveWatchlistCB
                )}
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
      </React.Fragment>
    );
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// handle favorite movie add or delete
const handleFavoriteUnfavorite = async (
  movie,
  favoriteCB,
  movieSearchFavoriteCB
) => {
  // add favorite api url
  let addFavoriteEndPoint = apiUrl + "/account/0/favorite";
  const queryString = `api_key=${apiKey}&session_id=${sessionId}`;
  addFavoriteEndPoint = `${addFavoriteEndPoint}?${queryString}`;

  // add favorite request body
  movie.favoriteFlag = !movie.favoriteFlag;
  const requestBody = {
    media_type: "movie",
    media_id: movie.id,
    favorite: movie.favoriteFlag
  };

  // request header for add favorite
  const requestHeader = {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  };

  // invoke the callback functions
  favoriteCB(movie); // favorite component callback
  movieSearchFavoriteCB(movie); // search-movies component callback

  // invoke try-catch
  try {
    // send post request to server
    await http.post(addFavoriteEndPoint, requestBody, requestHeader);

    // send status message
    movie.favoriteFlag
      ? toast("The movie successfully added to your favorite list!")
      : toast("The movie successfully removed from your favorite list!");
  } catch (e) {
    // roll-back on exception and
    // invoke the callback functions
    movie.favoriteFlag = !movie.favoriteFlag;
    favoriteCB(movie); // favorite component callback
    movieSearchFavoriteCB(movie); // search-movies component callback
    toast("An unexpected error occurred!");
  }
};

// handle favorite movie watch-later
const handleMovieWatchLater = async (
  movie,
  watchlistCB,
  movieSearchWatchCB
) => {
  // add watchlist api url
  let addWatchlistEndPoint = apiUrl + "/account/0/watchlist";
  const queryString = `api_key=${apiKey}&session_id=${sessionId}`;
  addWatchlistEndPoint = `${addWatchlistEndPoint}?${queryString}`;

  // add watchlist request body
  movie.watchlistFlag = !movie.watchlistFlag;
  const requestBody = {
    media_type: "movie",
    media_id: movie.id,
    watchlist: movie.watchlistFlag
  };

  // request header for add watch later
  const requestHeader = {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  };

  // invoke the callback functions
  watchlistCB(movie); // watchlist component callback
  movieSearchWatchCB(movie); // search-movies component callback

  // invoke try-catch
  try {
    // send post request to server
    await http.post(addWatchlistEndPoint, requestBody, requestHeader);

    // send status message
    movie.watchlistFlag
      ? toast("The movie successfully added to your watchlist!")
      : toast("The movie successfully removed from your watchlist!");
  } catch (e) {
    // roll-back on exception and
    // invoke the callback functions
    movie.watchlistFlag = !movie.watchlistFlag;
    watchlistCB(movie); // watchlist component callback
    movieSearchWatchCB(movie); // search-movies component callback
    toast("An unexpected error occurred!");
  }
};

// returns movie actions of a particular movie
export function getMovieActions(
  movie,
  movieSearchFavoriteCB,
  movieSearchWatchCB
) {
  try {
    return (
      <ul className="movie-actions" key={`action-${movie.id}`}>
        <li key={`action-${movie.id}-1`}>
          <Favorite
            movie={movie}
            movieSearchFavoriteCB={movieSearchFavoriteCB}
            onFavoriteUnfavorite={handleFavoriteUnfavorite}
          />
        </li>
        <li key={`action-${movie.id}-2`}>
          <WatchLater
            movie={movie}
            movieSearchWatchCB={movieSearchWatchCB}
            onMovieWatchLater={handleMovieWatchLater}
          />
        </li>
      </ul>
    );
  } catch (e) {
    // roll-back on exception and
    // invoke the error message
    toast("An unexpected error occurred!");
  }
}

// export default handler
export default {
  getMovieSearchResults,
  getMoviePoster,
  getMovieLink,
  getMovieInfo,
  getMovieDetailsInfo,
  getMovieActions,
  getFavoriteMovies,
  getFavoriteMoviesAll,
  getMovieDetails,
  getWatchlistMovies,
  getWatchlistMoviesAll
};
