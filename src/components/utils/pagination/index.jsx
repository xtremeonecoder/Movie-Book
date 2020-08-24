/**
 * Movie Book - Application - pagination Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import _ from "lodash"; // Upgraded version of Underscore Framework

// implementing pagination function using lodash library
export function pagination(items, itemsPerPage) {
  // return null if parameters are not specified
  if (!items || !itemsPerPage) return null;

  // evaluate starting index
  const startIndex = 0;

  // return value
  return _(items).slice(startIndex).take(itemsPerPage).value();
}
