import { useState } from "react";
import NoImage from "../components/NoImage";
import "./Cover.css";

const Cover = ({ path, title, section }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className={isLoading ? "cover__container_hidden" : "cover__container"}>
      <div className="cover__dark-overlay"></div>
      <div className="cover__text">{title}</div>

      {path ? (
        <img className="cover__image" src={`http://localhost:5000/${section}/images/${path}`} alt={title} onLoad={() => setIsLoading(false)} />
      ) : (
        <NoImage className="cover__image" alt={title} setIsLoading={setIsLoading} />
      )}
    </div>
  );
};

export default Cover;
