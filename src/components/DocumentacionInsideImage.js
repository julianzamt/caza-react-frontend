import "./DocumentacionInsideImage.css";
import React, { useState } from "react";

const DocumentacionInsideImage = ({ section, path }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`documentacionInsideImage__container ${
        isLoading ? "documentacionInsideImage__hidden" : "documentacionInsideImage__visible fade-in-fwd"
      }`}>
      <img
        className="documentacionInsideImage__image"
        src={`https://cazaestudio.herokuapp.com/${section}/images/${path}`}
        alt={`imagen de ${section}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default DocumentacionInsideImage;
