/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";

class TableHeader extends Component {
  // implementing current sort column
  // and setting state raising event
  raiseSort = ({ key, sortable }) => {
    // dont execute if column is not sortable
    if (!sortable) return;

    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.key === key) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.key = key;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  // implement sort icon for the table header
  getSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.key !== sortColumn.key) return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-desc"></i>;
    return <i className="fa fa-sort-asc"></i>;
  };

  // render table header content
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.key}
              onClick={() => this.raiseSort(column)}
              className="clickable"
              title={column.sortable && `Sort by "${column.key}"`}
            >
              {column.label} {column.sortable && this.getSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
