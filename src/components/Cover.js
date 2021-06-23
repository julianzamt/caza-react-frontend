import { Link } from "react-router-dom";
import NoImage from "../components/NoImage";
import "./Cover.css";

const Cover = ({ path, title, id, section }) => {
  return (
    <div className="cover__container">
      <div className="cover__dark-overlay"></div>
      <div className="cover__text">{title}</div>
      <Link to={`/${section}/${id}`}>
        {path ? (
          <img
            className="cover__image"
            src={`http://localhost:5000/${section}/images/${path}`}
            alt={title}
            onLoad={event => (event.target.style.visibility = "visible")}
          />
        ) : (
          <NoImage className="cover__image" alt={title} />
        )}
      </Link>
    </div>
  );
};

export default Cover;
