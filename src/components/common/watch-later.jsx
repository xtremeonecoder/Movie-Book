/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";

class WatchLater extends Component {
  state = {
    movie: {},
    className: ""
  };

  // loads during component mount
  componentDidMount() {
    this.watchLaterIcon(this.props.movie);
  }

  // set css-class for watch-later icon
  watchLaterIcon = movie => {
    const className = !movie.watchlistFlag ? "fa fa-eye-slash" : "fa fa-eye";
    this.setState({ movie, className });
  };

  // render watch later widget
  render() {
    const { movie, className } = this.state;
    const { onMovieWatchLater, movieSearchWatchCB } = this.props;
    return (
      <i
        style={{ cursor: "pointer", fontSize: "40px" }}
        aria-hidden="true"
        className={className}
        onClick={() =>
          onMovieWatchLater(movie, this.watchLaterIcon, movieSearchWatchCB)
        }
      />
    );
  }
}

export default WatchLater;
