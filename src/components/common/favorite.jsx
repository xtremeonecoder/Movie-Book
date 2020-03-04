/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";

class Favorite extends Component {
  state = {
    movie: {},
    className: ""
  };

  // loads during component mount
  componentDidMount() {
    this.favoriteIcon(this.props.movie);
  }

  // set css-class for favorite icon
  favoriteIcon = movie => {
    const className = !movie.favoriteFlag ? "fa fa-star-o" : "fa fa-star";
    this.setState({ movie, className });
  };

  // render add/remove favorite movie widget
  render() {
    const { movie, className } = this.state;
    const { onFavoriteUnfavorite, movieSearchFavoriteCB } = this.props;
    return (
      <i
        style={{ cursor: "pointer", fontSize: "40px" }}
        aria-hidden="true"
        className={className}
        onClick={() =>
          onFavoriteUnfavorite(movie, this.favoriteIcon, movieSearchFavoriteCB)
        }
      />
    );
  }
}

export default Favorite;
