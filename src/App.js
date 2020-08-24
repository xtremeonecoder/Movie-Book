/**
 * Movie Book - Application - App.js
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SearchMovies from "./components/search-movies";
import FavoriteMovies from "./components/favorite-movies";
import WatchlistMovies from "./components/watchlist-movies";
import MainMenu from "./components/main-menu";
import NotFound from "./components/not-found";
import MovieInfo from "./components/movie-info";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <ToastContainer />
        <MainMenu />

        <div className="content">
          <Switch>
            <Route
              path="/movie-info/:page/:movie_id/:title"
              component={MovieInfo}
            />
            <Route path="/not-found" component={NotFound} />
            <Route path="/search-movies" exact component={SearchMovies} />
            <Route path="/favorite-movies" exact component={FavoriteMovies} />
            <Route path="/watchlist-movies" exact component={WatchlistMovies} />
            <Redirect from="/" to="/search-movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
