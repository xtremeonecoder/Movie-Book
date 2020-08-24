/**
 * Movie Book - Application - themoviedb-service.js
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import { toast } from "react-toastify";
import http from "./../http-service";
import { apiUrl, apiKey, sessionId } from "./../../config.json";

// sends api http request to server
// and get api http response result from server
export function getMovieSearchResults(query) {
  try {
    // preparing full api url
    const page = query.page ? query.page : 1;
    let searchMoviesEndPoint = apiUrl + "/search/movie";
    const queryString = `api_key=${apiKey}&query=${query.keyword}&language=en-US&include_adult=false&page=${page}`;
    searchMoviesEndPoint = `${searchMoviesEndPoint}?${queryString}`;

    // sends http request to server
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
    // preparing full api url
    const page = query.page ? query.page : 1;
    let favoriteMoviesEndPoint = apiUrl + "/account/0/favorite/movies";
    const queryString = `api_key=${apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${page}`;
    favoriteMoviesEndPoint = `${favoriteMoviesEndPoint}?${queryString}`;

    // sends http request to server
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

    // calls favorite movie api for first page
    const { data } = await getFavoriteMovies(query);
    let results = data.results;

    // accumulates all the favorite movies
    const totalPages = parseInt(data.total_pages);
    for (let i = 1; i <= totalPages; i++) {
      if (i > 1) {
        query.page = i;

        // calls favorite movie api for other pages
        const { data } = await getFavoriteMovies(query);
        results = data.results;
      }

      // collect all the favorite movie ids
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
    // preparing full api url
    const page = query.page ? query.page : 1;
    let watchlistMoviesEndPoint = apiUrl + "/account/0/watchlist/movies";
    const queryString = `api_key=${apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=${page}`;
    watchlistMoviesEndPoint = `${watchlistMoviesEndPoint}?${queryString}`;

    // sends http request to server
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

    // calls watchlist movie api for first page
    const { data } = await getWatchlistMovies(query);
    let results = data.results;

    // accumulates all the watchlist movies
    const totalPages = parseInt(data.total_pages);
    for (let i = 1; i <= totalPages; i++) {
      if (i > 1) {
        query.page = i;

        // calls watchlist movie api for other pages
        const { data } = await getWatchlistMovies(query);
        results = data.results;
      }

      // collect all the watchlist movie ids
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
    // return null if movie id is invalid
    if (!movieId) return null;

    // preparing full api url
    let movieDetailsEndPoint = `${apiUrl}/movie/${movieId}`;
    const queryString = `api_key=${apiKey}&append_to_response=videos,images`;
    movieDetailsEndPoint = `${movieDetailsEndPoint}?${queryString}`;

    // sends http request to server
    return http.get(movieDetailsEndPoint);
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
    favorite: movie.favoriteFlag,
  };

  // request header for add favorite
  const requestHeader = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
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
    watchlist: movie.watchlistFlag,
  };

  // request header for add watch later
  const requestHeader = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
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

// export default handler
export default {
  getMovieSearchResults,
  handleMovieWatchLater,
  handleFavoriteUnfavorite,
  getFavoriteMovies,
  getFavoriteMoviesAll,
  getMovieDetails,
  getWatchlistMovies,
  getWatchlistMoviesAll,
};
