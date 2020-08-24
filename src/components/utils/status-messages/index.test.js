/**
 * Movie Book - Application - status-message Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import StatusMessages from "./index";
import { checkProps, findByTestAttr } from "./../../../../utilities";

const setup = (props = {}) => {
  // returns the rendered component
  return shallow(<StatusMessages {...props} />);
};

const findThis = (expectedProps, attribute) => {
  // get the rendered component
  const component = setup(expectedProps);

  // find objects by attribute
  return findByTestAttr(component, attribute);
};

describe("StatusMessages Component", () => {
  let expectedProps;
  beforeEach(() => {
    // mocking the props
    expectedProps = {
      totalCount: 5,
      loadingImage: false,
      introduction: false,
    };
  });

  describe("Checking prototypes", () => {
    it("Should not throw a warning!", () => {
      // check props
      const propsError = checkProps(StatusMessages, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it("Should throw a warning!", () => {
      // reset to wrong data type
      expectedProps.totalCount = "String Value";

      // check props
      const propsError = checkProps(StatusMessages, expectedProps);
      expect(propsError).toBeDefined();
    });
  });

  describe("Props are valid!", () => {
    it("Should render without crashing!", () => {
      const div = document.createElement("div");
      ReactDOM.render(<StatusMessages {...expectedProps} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it("Should render introduction message!", () => {
      // reset variable value
      expectedProps.introduction = true;

      // get the rendered component
      const introduction = findThis(expectedProps, "introduction");
      expect(introduction.length).toBe(1);
    });

    it("Should render loading image!", () => {
      // reset variable value
      expectedProps.loadingImage = true;

      // get the rendered component
      const loadingImage = findThis(expectedProps, "loadingImage");
      expect(loadingImage.length).toBe(1);
    });

    it("Should render result not found message!", () => {
      // reset variable value
      expectedProps.totalCount = 0;

      // get the rendered component
      const notFound = findThis(expectedProps, "notFound");
      expect(notFound.length).toBe(1);
    });
  });

  describe("Props are invalid!", () => {
    it("Should not render status message component!", () => {
      // should not render introduction message
      const introduction = findThis(expectedProps, "introduction");
      expect(introduction.length).toBe(0);

      // should not render loadingImage
      const loadingImage = findThis(expectedProps, "loadingImage");
      expect(loadingImage.length).toBe(0);

      // should not render result not found message
      const notFound = findThis(expectedProps, "notFound");
      expect(notFound.length).toBe(0);
    });
  });
});
