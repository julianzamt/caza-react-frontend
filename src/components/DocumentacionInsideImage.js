import "./DocumentacionInsideImage.css";
import React, { useState } from "react";

const baseUrl = process.env.REACT_APP_DEVELOPMENT_BASE_URL || "https://cazaestudio.herokuapp.com";

const DocumentacionInsideImage = ({ section, path }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`documentacionInsideImage__container ${
        isLoading ? "documentacionInsideImage__hidden" : "documentacionInsideImage__visible fade-in-fwd"
      }`}>
      <img
        className="documentacionInsideImage__image"
        src={`${baseUrl}/${section}/images/${path}`}
        alt={`imagen de ${section}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default DocumentacionInsideImage;
