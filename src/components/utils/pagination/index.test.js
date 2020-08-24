/**
 * Movie Book - Application - pagination Test
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import _ from "lodash";
import { pagination } from "./index";

describe("Pagination Component", () => {
  describe("Parameters have value!", () => {
    it("Should return a number!", () => {
      // call the pagination function
      const returnedValue = pagination([1, 2, 3, 4, 5, 6], 4);
      expect(returnedValue.length).toBe(4);
    });
  });

  describe("Parameters are missing!", () => {
    it("Should return a null!", () => {
      // call the pagination function
      const returnedValue = pagination();
      expect(returnedValue).toBeNull();
    });
  });
});
