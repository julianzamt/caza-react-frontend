import NoImage from "../components/NoImage";
import "./Cover.css";
import React, { useState } from "react";

const Cover = ({ path, title, section }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`cover__container ${isLoading ? "hidden" : "visible fade-in-fwd"}`}>
      <div className="cover__dark-overlay"></div>
      <div className="cover__text">{title}</div>
      {path ? (
        <img className="cover__image" src={`http://localhost:5000/${section}/images/${path}`} alt={title} onLoad={() => setIsLoading(false)} />
      ) : (
        <NoImage className="cover__image" alt={title} />
      )}
    </div>
  );
};

export default Cover;
