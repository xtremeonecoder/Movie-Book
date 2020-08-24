/**
 * Movie Book - Application - movie-actions Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import MovieActions from "./index";
import { checkProps, findByTestAttr } from "./../../../../utilities";

const setup = (props = {}) => {
  // returns the rendered component
  return shallow(<MovieActions {...props} />);
};

const findThis = (expectedProps, attribute) => {
  // get the rendered component
  const component = setup(expectedProps);

  // find objects by attribute
  return findByTestAttr(component, attribute);
};

describe("MovieActions Component", () => {
  let expectedProps;
  beforeEach(() => {
    // mocking the props
    expectedProps = {
      movie: { id: 2 },
      onMovieWatchLater: jest.fn(),
      onFavoriteUnfavorite: jest.fn(),
    };
  });

  describe("Checking prototypes", () => {
    it("Should not throw a warning!", () => {
      // check props
      const propsError = checkProps(MovieActions, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it("Should throw a warning!", () => {
      expectedProps.movie = "String Value";
      // check props
      const propsError = checkProps(MovieActions, expectedProps);
      expect(propsError).toBeDefined();
    });
  });

  describe("Props exist!", () => {
    it("Should render without crashing!", () => {
      const div = document.createElement("div");
      ReactDOM.render(<MovieActions {...expectedProps} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it("Should contain movie actions list!", () => {
      const movieActionList = findThis(expectedProps, "movieActionList");
      expect(movieActionList.length).toBe(1);
    });
  });

  describe("Props are missing!", () => {
    it("Should not contain movie actions list!", () => {
      const expectedProps = {};
      const movieActionList = findThis(expectedProps, "movieActionList");
      expect(movieActionList.length).toBe(0);
    });
  });
});
