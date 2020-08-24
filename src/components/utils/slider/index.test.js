/**
 * Movie Book - Application - Slide Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { shallow } from "enzyme";
import Slider from "./index";
import { checkProps, findByTestAttr } from "./../../../../utilities";

const setup = (props = {}) => {
  // returns the rendered component
  return shallow(<Slider {...props} />);
};

const findThis = (expectedProps, attribute) => {
  // get the rendered component
  const component = setup(expectedProps);

  // find objects by attribute
  return findByTestAttr(component, attribute);
};

describe("Slider Component", () => {
  let expectedProps;
  beforeEach(() => {
    // mocking the props
    expectedProps = {
      posters: ["poster1.jpg", "poster2.jpg"],
      backdrops: ["slide1.jpg", "slide1.jpg"],
    };
  });

  describe("Checking prototypes", () => {
    it("Should not throw a warning!", () => {
      // check props
      const propsError = checkProps(Slider, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it("Should throw a warning!", () => {
      expectedProps.posters = "String Value";
      expectedProps.backdrops = "String Value";
      // check props
      const propsError = checkProps(Slider, expectedProps);
      expect(propsError).toBeDefined();
    });
  });

  describe("Slider and poster images exist!", () => {
    it("Should render movie slider!", () => {
      const movieSlider = findThis(expectedProps, "movieSlider");
      expect(movieSlider.length).toBe(1);
    });

    it("Should render movie posters!", () => {
      const moviePoster = findThis(expectedProps, "moviePoster");
      expect(moviePoster.length).toBe(2);
    });
  });

  describe("Only slider images exist!", () => {
    beforeEach(() => {
      // reset posters as empty array
      expectedProps.posters = [];
    });

    it("Should render movie slider!", () => {
      const movieSlider = findThis(expectedProps, "movieSlider");
      expect(movieSlider.length).toBe(1);
    });

    it("Should not render movie posters!", () => {
      const moviePoster = findThis(expectedProps, "moviePoster");
      expect(moviePoster.length).toBe(0);
    });
  });

  describe("Only poster images exist!", () => {
    beforeEach(() => {
      // reset slider as empty array
      expectedProps.backdrops = [];
    });

    it("Should not render movie slider!", () => {
      const movieSlider = findThis(expectedProps, "movieSlider");
      expect(movieSlider.length).toBe(0);
    });

    it("Should render movie posters!", () => {
      const moviePoster = findThis(expectedProps, "moviePoster");
      expect(moviePoster.length).toBe(2);
    });
  });

  describe("Both slider and posters are missing!", () => {
    beforeEach(() => {
      // reset posters and slider as empty array
      expectedProps.posters = [];
      expectedProps.backdrops = [];
    });

    it("Should not render movie slider!", () => {
      const movieSlider = findThis(expectedProps, "movieSlider");
      expect(movieSlider.length).toBe(0);
    });

    it("Should not render movie posters!", () => {
      const moviePoster = findThis(expectedProps, "moviePoster");
      expect(moviePoster.length).toBe(0);
    });
  });
});
