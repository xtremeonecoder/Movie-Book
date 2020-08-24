/**
 * Movie Book - Application - main-menu Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const MainMenu = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand as={NavLink} to="/">
        <i className="fa fa-leaf">&nbsp;Movie Book</i>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/search-movies">
            <i className="fa fa-search-plus">&nbsp;Search Movies</i>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/favorite-movies">
            <i className="fa fa-heart">&nbsp;Favorite Movies</i>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/watchlist-movies">
            <i className="fa fa-list">&nbsp;Watchlist Movies</i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainMenu;
