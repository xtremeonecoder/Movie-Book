/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  // evaluate unique key for table cell
  createKey = (item, column) => {
    const { defaultPropID } = this.props;
    return item[defaultPropID] + column.key;
  };

  // evaluate table cell value
  getCellValue = (item, column) => {
    if (column.content) {
      return column.content(item);
    }

    return _(item).get(column.key);
  };

  // render table body content
  render() {
    // getting props items using object destructuring
    const { items, columns, defaultPropID } = this.props;

    return (
      <tbody>
        {items.map(item => (
          <tr key={item[defaultPropID]}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.getCellValue(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  defaultPropID: "id"
};

export default TableBody;
