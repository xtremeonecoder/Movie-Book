/**
 * Movie Book - Application - status-messages Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import PropTypes from "prop-types";

const StatusMessages = ({ totalCount, loadingImage, introduction }) => {
  // don't render if no parameter is defined
  if (totalCount > 0 && !loadingImage && !introduction) return null;

  // returns movie info react component
  return (
    <React.Fragment>
      {loadingImage !== false && (
        <div data-test="loadingImage" className="fa-5x">
          <i className="fa fa-cog fa-spin"></i>
        </div>
      )}
      {introduction !== false && (
        <h2 data-test="introduction" className="intro-message">
          <i class="fa fa-film"></i>
          <div style={{ clear: "both" }}></div>
          Search Your Favorite Movies Here!
        </h2>
      )}
      {totalCount === 0 && loadingImage === false && (
        <h2 data-test="notFound" className="notfound-message">
          <i class="fa fa-film"></i>
          <div style={{ clear: "both" }}></div>
          Sorry, no result found on your search!
        </h2>
      )}
    </React.Fragment>
  );
};

StatusMessages.propTypes = {
  totalCount: PropTypes.number,
  loadingImage: PropTypes.bool,
  introduction: PropTypes.bool,
};

export default StatusMessages;
