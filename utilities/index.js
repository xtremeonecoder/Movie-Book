/**
 * Movie Book - Application - utility functions
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import checkPropTypes from "check-prop-types";

export const findByTestAttr = (component, attribute) => {
  return component.find(`[data-test='${attribute}']`);
};

export const checkProps = (component, expectedProps) => {
  return checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
};
