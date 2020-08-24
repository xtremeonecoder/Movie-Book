/**
 * Movie Book - Application - movie-details Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { shallow } from "enzyme";
import MovieDetails from "./index";
import { checkProps, findByTestAttr } from "./../../../../utilities";

const setup = (props = {}) => {
  // returns the rendered component
  return shallow(<MovieDetails {...props} />);
};

const findThis = (expectedProps, attribute) => {
  // get the rendered component
  const component = setup(expectedProps);

  // find objects by attribute
  return findByTestAttr(component, attribute);
};

describe("MovieDetails Component", () => {
  let expectedProps;
  beforeEach(() => {
    // mocking the props
    expectedProps = {
      movie: {
        id: 2,
        images: {
          posters: "posters",
        },
      },
      callbacks: {
        favoriteUnfavoriteCB: jest.fn(),
        addRemoveWatchlistCB: jest.fn(),
      },
    };
  });

  describe("Checking prototypes", () => {
    it("Should not throw a warning!", () => {
      // check props
      const propsError = checkProps(MovieDetails, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it("Should throw a warning!", () => {
      expectedProps.movie = "String Value";
      // check props
      const propsError = checkProps(MovieDetails, expectedProps);
      expect(propsError).toBeDefined();
    });
  });

  describe("Props exist!", () => {
    it("Should contain movie details component!", () => {
      const movieDetailsComponent = findThis(
        expectedProps,
        "movieDetailsComponent"
      );
      expect(movieDetailsComponent.length).toBe(1);
    });

    it("Should contain movie poster!", () => {
      const moviePoster = findThis(expectedProps, "moviePoster");
      expect(moviePoster.length).toBe(1);
    });

    it("Should contain movie details info!", () => {
      const movieDetails = findThis(expectedProps, "movieDetails");
      expect(movieDetails.length).toBe(1);
    });
  });

  describe("Props are missing!", () => {
    it("Should not contain movie details component!", () => {
      const expectedProps = {};
      const movieDetailsComponent = findThis(
        expectedProps,
        "movieDetailsComponent"
      );
      expect(movieDetailsComponent.length).toBe(0);
    });
  });
});
