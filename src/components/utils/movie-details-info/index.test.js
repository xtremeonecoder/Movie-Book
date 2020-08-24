/**
 * Movie Book - Application - movie-details-info Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import MovieDetailsInfo from "./index";
import { checkProps, findByTestAttr } from "./../../../../utilities";

const setup = (props = {}) => {
  // returns the rendered component
  return shallow(<MovieDetailsInfo {...props} />);
};

const findThis = (expectedProps, attribute) => {
  // get the rendered component
  const component = setup(expectedProps);

  // find objects by attribute
  return findByTestAttr(component, attribute);
};

describe("MovieDetailsInfo Component", () => {
  let expectedProps;
  beforeEach(() => {
    // mocking the props
    expectedProps = {
      movie: {
        id: 2,
        title: "Movie Title",
        tagline: "Movie Tagline",
        overview: "Movie Overview",
        images: {
          posters: "posters",
        },
        popularity: 1,
        genres: ["action movie"],
        production_countries: ["Sweden"],
        production_companies: ["Eagle Movies"],
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
      const propsError = checkProps(MovieDetailsInfo, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it("Should throw a warning!", () => {
      expectedProps.movie = "String Value";
      // check props
      const propsError = checkProps(MovieDetailsInfo, expectedProps);
      expect(propsError).toBeDefined();
    });
  });

  describe("Props exist!", () => {
    it("Should render without crashing!", () => {
      const div = document.createElement("div");
      ReactDOM.render(<MovieDetailsInfo {...expectedProps} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it("Should contain movie details info component!", () => {
      const movieDetailsInfoComponent = findThis(
        expectedProps,
        "movieDetailsInfoComponent"
      );
      expect(movieDetailsInfoComponent.length).toBe(1);
    });

    it("Should contain movie title!", () => {
      const movieTitle = findThis(expectedProps, "movieTitle");
      expect(movieTitle.length).toBe(1);
    });

    it("Should contain movie tagline!", () => {
      const movieTagline = findThis(expectedProps, "movieTagline");
      expect(movieTagline.length).toBe(1);
    });

    it("Should contain movie overview!", () => {
      const movieOverview = findThis(expectedProps, "movieOverview");
      expect(movieOverview.length).toBe(1);
    });

    it("Should contain movie details info!", () => {
      const movieDetails = findThis(expectedProps, "movieDetails");
      expect(movieDetails.length).toBe(1);
    });
  });

  describe("Props are missing!", () => {
    it("Should not contain movie details component!", () => {
      const expectedProps = {};
      const movieDetailsInfoComponent = findThis(
        expectedProps,
        "movieDetailsInfoComponent"
      );
      expect(movieDetailsInfoComponent.length).toBe(0);
    });
  });
});
