/**
 * Movie Book - Application - video Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { shallow } from "enzyme";
import Video from "./index";
import { checkProps, findByTestAttr } from "./../../../../utilities";

const setup = (props = {}) => {
  // returns the rendered component
  return shallow(<Video {...props} />);
};

const findThis = (expectedProps, attribute) => {
  // get the rendered component
  const component = setup(expectedProps);

  // find objects by attribute
  return findByTestAttr(component, attribute);
};

describe("Video Component", () => {
  let expectedProps;
  beforeEach(() => {
    // mocking the props
    expectedProps = {
      videos: [
        {
          key: "key",
          site: "youtube",
          name: "test video",
        },
      ],
    };
  });

  describe("Checking prototypes", () => {
    it("Should not throw a warning!", () => {
      // check props
      const propsError = checkProps(Video, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it("Should throw a warning!", () => {
      // reset to wrong data type
      expectedProps.videos = "String Value";

      // check props
      const propsError = checkProps(Video, expectedProps);
      expect(propsError).toBeDefined();
    });
  });

  describe("Movie video exists!", () => {
    it("Should render video component!", () => {
      const videoComponent = findThis(expectedProps, "videoComponent");
      expect(videoComponent.length).toBe(1);
    });

    it("Should render video title!", () => {
      const videoTitle = findThis(expectedProps, "videoTitle");
      expect(videoTitle.length).toBe(1);
    });

    it("Should render video player!", () => {
      const videoPlayer = findThis(expectedProps, "videoPlayer");
      expect(videoPlayer.length).toBe(1);
    });
  });

  describe("Movie video doesn't exist!", () => {
    it("Should not render video component!", () => {
      // reset to empty array
      expectedProps.videos = [];

      const videoComponent = findThis(expectedProps, "videoComponent");
      expect(videoComponent.length).toBe(0);
    });
  });
});
