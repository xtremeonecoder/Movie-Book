/**
 * Movie Book - Application - pagination Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";
import { Pagination as Paging } from "react-bootstrap";
import PropTypes from "prop-types";

class Pagination extends Component {
  // return page item array
  numberOfPage() {
    const { totalItemCount, itemPerPage } = this.props;

    if (itemPerPage <= 0) {
      return [];
    }
    const pages = Math.ceil(totalItemCount / itemPerPage);
    if (pages <= 1) {
      return [];
    }

    let numberOfPage = [];
    for (let i = 0; i < pages; i++) {
      numberOfPage[i] = i + 1;
    }

    return numberOfPage;
  }

  // implement active class to show current page
  activeClass(page) {
    let className = "page-item";
    className += page === this.props.currentPage ? " active" : "";
    return className;
  }

  // render pagination template
  render() {
    const { onPageChange } = this.props;
    const numberOfPage = this.numberOfPage();
    const firstPage = 1;
    const lastPage = numberOfPage.length;

    return (
      <Paging>
        <Paging.First />
        <Paging.Prev />
        <Paging.Item key={firstPage} onClick={() => onPageChange(firstPage)}>
          {firstPage}
        </Paging.Item>
        <Paging.Ellipsis />
        {numberOfPage.map((page) => {
          if (page !== firstPage && page !== lastPage) {
            return (
              <Paging.Item key={page} onClick={() => onPageChange(page)}>
                {page}
              </Paging.Item>
            );
          }
          return null;
        })}
        <Paging.Ellipsis />
        <Paging.Item key={lastPage} onClick={() => onPageChange(lastPage)}>
          {lastPage}
        </Paging.Item>
        <Paging.Next />
        <Paging.Last />
      </Paging>
    );
  }
}

// PropTypes declaration for warning
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
