/**
 * Movie Book - Application - movie-poster Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { shallow } from "enzyme";
import MoviePoster from "./index";
import { checkProps, findByTestAttr } from "./../../../../utilities";

const setup = (props = {}) => {
  // returns the rendered component
  return shallow(<MoviePoster {...props} />);
};

const findThis = (expectedProps, attribute) => {
  // get the rendered component
  const component = setup(expectedProps);

  // find objects by attribute
  return findByTestAttr(component, attribute);
};

describe("MoviePoster Component", () => {
  let expectedProps;
  beforeEach(() => {
    // mocking the props
    expectedProps = {
      page: 2,
      movie: {
        id: 2,
        title: "Movie Title",
        poster_path: "poster path",
      },
    };
  });

  describe("Checking prototypes", () => {
    it("Should not throw a warning!", () => {
      // check props
      const propsError = checkProps(MoviePoster, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it("Should throw a warning!", () => {
      expectedProps.movie = "String Value";
      // check props
      const propsError = checkProps(MoviePoster, expectedProps);
      expect(propsError).toBeDefined();
    });
  });

  describe("Props exist!", () => {
    it("Should render movie poster component!", () => {
      const moviePosterComponent = findThis(
        expectedProps,
        "moviePosterComponent"
      );
      expect(moviePosterComponent.length).toBe(1);
    });

    it("Should contain movie poster!", () => {
      const moviePoster = findThis(expectedProps, "moviePoster");
      expect(moviePoster.length).toBe(1);
    });
  });

  describe("Props are missing!", () => {
    it("Should not contain movie poster component!", () => {
      const expectedProps = {};
      const moviePosterComponent = findThis(
        expectedProps,
        "moviePosterComponent"
      );
      expect(moviePosterComponent.length).toBe(0);
    });
  });
});
