/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";

const PageFooter = () => {
  // get current year
  const dataObj = new Date();
  const currentYear = dataObj.getFullYear();

  // render application footer
  return (
    <footer className="site-footer">
      <div className="row"></div>
      <div className="colophon">
        Copyright &copy; {currentYear}{" "}
        <a
          href="https://www.linkedin.com/in/xtreme1coder/"
          rel="noopener noreferrer"
          target="_blank"
        >
          XtremeOneCoder
        </a>
        . Designed and developed by{" "}
        <a
          href="https://github.com/xtremeonecoder"
          rel="noopener noreferrer"
          target="_blank"
        >
          Suman Barua
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default PageFooter;
