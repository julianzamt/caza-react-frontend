import "./SectionInsideImage.css";
import React, { useState, useRef } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const baseUrl = process.env.REACT_APP_DEVELOPMENT_BASE_URL || "https://cazaestudio.herokuapp.com";

const SectionInsideImage = ({ section, path, setLoadCount }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [portrait, setPortrait] = useState(false);
  const imgRef = useRef();
  const tablet = useMediaQuery("(min-width:1001px)");

  const handleLoad = () => {
    setIsLoading(false);
    if (imgRef.current.naturalHeight > imgRef.current.naturalWidth) {
      setPortrait(true);
    }
  };

  return (
    <div className={`sectionInsideImage__container ${isLoading ? "sectionInsideImage__hidden" : "sectionInsideImage__visible fade-in-fwd"}`}>
      <img
        className={portrait && tablet ? "sectionInsideImage__portrait" : "sectionInsideImage__image"}
        ref={imgRef}
        src={`${baseUrl}/${section}/images/${path}`}
        alt={`imagen de ${section}`}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default SectionInsideImage;
