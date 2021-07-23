import NoImage from "../components/NoImage";
import "./Cover.css";
import React, { useState } from "react";

const baseUrl = process.env.REACT_APP_DEVELOPMENT_BASE_URL || "https://cazaestudio.herokuapp.com";

const Cover = ({ path, title, section }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`cover__container ${isLoading ? "hidden" : "visible fade-in-fwd"}`}>
      <div className="cover__dark-overlay"></div>
      <div className="cover__text">{title}</div>
      {path ? (
        <img className="cover__image" src={`${baseUrl}/${section}/images/${path}`} alt={title} onLoad={() => setIsLoading(false)} />
      ) : (
        <NoImage className="cover__image" alt={title} />
      )}
    </div>
  );
};

export default Cover;
