/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { Link } from "react-router-dom";
import { imagePath } from "../../config.json";
import Carousel from "react-bootstrap/Carousel";

const Slider = ({ posters, backdrops }) => {
  let imageCounter = 0;
  let imageCounter2 = 0;

  // return null if there is no poster and backdrop
  if (backdrops.length <= 0 && posters.length <= 0) return null;

  // render movie slider and posters
  return (
    <React.Fragment>
      {backdrops.length > 0 && (
        <div className="row">
          <div className="col-md-12">
            <div className="slider">
              <h2 class="section-title section-title2">
                Movie Image Slide Show
              </h2>
              <Carousel>
                {backdrops.map(backdrop => {
                  imageCounter++;
                  if (imageCounter > 6) return null;
                  return (
                    <Carousel.Item key={`backdrop-image-${imageCounter}`}>
                      <img
                        className="d-block w-100"
                        src={`${imagePath}${backdrop.file_path}`}
                        alt={`Slide Image - ${imageCounter}`}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      )}
      {posters.length > 0 && (
        <React.Fragment>
          <h2 class="section-title section-title2">Movie Poster Images</h2>
          <div className="row">
            {posters.map(poster => {
              imageCounter2++;
              if (imageCounter2 > 4) return null;
              return (
                <div
                  key={`poster-image-${imageCounter2}`}
                  className="col-sm-6 col-md-3"
                >
                  <div className="latest-movie">
                    <Link to="#">
                      <img
                        src={`${imagePath}${poster.file_path}`}
                        alt={`Poster Image - ${imageCounter2}`}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Slider;
