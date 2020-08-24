/**
 * Movie Book - Application - video Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const Video = ({ videos }) => {
  // return null if there is no video
  if (videos.length <= 0) return null;

  // form video url
  const video = videos[0];
  let videoUrl = "";
  if (video.site.toLowerCase() === "youtube")
    videoUrl = `https://www.youtube.com/embed/${video.key}`;
  else if (video.site.toLowerCase() === "vimeo")
    videoUrl = `https://vimeo.com/${video.key}`;
  else if (video.site.toLowerCase() === "twitch")
    videoUrl = `https://www.twitch.tv/videos/${video.key}`;
  else if (video.site.toLowerCase() === "facebook")
    videoUrl = `https://www.facebook.com/facebook/videos/${video.key}`;
  else if (video.site.toLowerCase() === "streamable")
    videoUrl = `https://streamable.com/${video.key}`;
  else if (video.site.toLowerCase() === "wistia")
    videoUrl = `https://home.wistia.com/medias/${video.key}`;
  else if (video.site.toLowerCase() === "dailymotion")
    videoUrl = `https://www.dailymotion.com/video/${video.key}`;

  // render movie video
  return (
    <div className="row">
      <div className="col-md-12">
        <div data-test="videoComponent" className="slider">
          <h2 data-test="videoTitle" className="section-title section-title2">
            {video.name}
          </h2>
          <ReactPlayer
            data-test="videoPlayer"
            url={videoUrl}
            playing={true}
            loop={true}
            muted={true}
            width="100%"
            height={526}
          />
        </div>
      </div>
    </div>
  );
};

Video.propTypes = {
  videos: PropTypes.array,
};

export default Video;
