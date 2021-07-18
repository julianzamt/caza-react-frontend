import NoImage from "../components/NoImage";
import "./Cover.css";
import React, { useState } from "react";

const Cover = ({ path, title, section, setLoadCount }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`cover__container ${isLoading ? "cover__displayNone" : "cover__displayBlock fade-in-fwd"}`}>
      <div className="cover__dark-overlay"></div>
      <div className="cover__text">{title}</div>
      {path ? (
        <img className="cover__image" src={`http://localhost:5000/${section}/images/${path}`} alt={title} onLoad={() => setIsLoading(false)} />
      ) : (
        <NoImage className="cover__image" alt={title} setLoadCount={setLoadCount} />
      )}
    </div>
  );
};

export default Cover;
