/**
 * Movie Book - Application - movie-info Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { shallow } from "enzyme";
import MovieInfo from "./index";
import { checkProps, findByTestAttr } from "./../../../../utilities";

const setup = (props = {}) => {
  // returns the rendered component
  return shallow(<MovieInfo {...props} />);
};

const findThis = (expectedProps, attribute) => {
  // get the rendered component
  const component = setup(expectedProps);

  // find objects by attribute
  return findByTestAttr(component, attribute);
};

describe("MovieInfo Component", () => {
  let expectedProps;
  beforeEach(() => {
    // mocking the props
    expectedProps = {
      page: 2,
      movie: {
        id: 2,
        title: "Movie Title",
        popularity: 1,
        vote_count: 2,
        vote_average: 3,
        original_language: "en",
        release_date: "20/08/2020",
      },
    };
  });

  describe("Checking prototypes", () => {
    it("Should not throw a warning!", () => {
      // check props
      const propsError = checkProps(MovieInfo, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it("Should throw a warning!", () => {
      expectedProps.movie = "String Value";
      // check props
      const propsError = checkProps(MovieInfo, expectedProps);
      expect(propsError).toBeDefined();
    });
  });

  describe("Props exist!", () => {
    it("Should contain movie info component!", () => {
      const movieInfoComponent = findThis(expectedProps, "movieInfoComponent");
      expect(movieInfoComponent.length).toBe(1);
    });

    it("Should contain movie information!", () => {
      const movieInfo = findThis(expectedProps, "movieInfo");
      expect(movieInfo.length).toBe(1);
    });
  });

  describe("Props are missing!", () => {
    it("Should not contain movie info component!", () => {
      const expectedProps = {};
      const movieInfoComponent = findThis(expectedProps, "movieInfoComponent");
      expect(movieInfoComponent.length).toBe(0);
    });
  });
});
