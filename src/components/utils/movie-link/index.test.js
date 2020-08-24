/**
 * Movie Book - Application - movie-link Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { shallow } from "enzyme";
import MovieLink from "./index";
import { checkProps, findByTestAttr } from "./../../../../utilities";

const setup = (props = {}) => {
  // returns the rendered component
  return shallow(<MovieLink {...props} />);
};

const findThis = (expectedProps, attribute) => {
  // get the rendered component
  const component = setup(expectedProps);

  // find objects by attribute
  return findByTestAttr(component, attribute);
};

describe("MovieLink Component", () => {
  let expectedProps;
  beforeEach(() => {
    // mocking the props
    expectedProps = {
      page: 2,
      movie: {
        id: 2,
        title: "Movie Title",
      },
    };
  });

  describe("Checking prototypes", () => {
    it("Should not throw a warning!", () => {
      // check props
      const propsError = checkProps(MovieLink, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it("Should throw a warning!", () => {
      expectedProps.movie = "String Value";
      // check props
      const propsError = checkProps(MovieLink, expectedProps);
      expect(propsError).toBeDefined();
    });
  });

  describe("Props exist!", () => {
    it("Should contain movie link component!", () => {
      const movieLinkComponent = findThis(expectedProps, "movieLinkComponent");
      expect(movieLinkComponent.length).toBe(1);
    });
  });

  describe("Props are missing!", () => {
    it("Should not contain movie link component!", () => {
      const expectedProps = {};
      const movieLinkComponent = findThis(expectedProps, "movieLinkComponent");
      expect(movieLinkComponent.length).toBe(0);
    });
  });
});
