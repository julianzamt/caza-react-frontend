import { Link } from "react-router-dom";
import noimage from "../images/noimage.svg";
import NoImage from "../components/NoImage";
import "./Cover.css";

const Cover = ({ path, title, id, section }) => {
  return (
    <div className="cover__container">
      <div className="cover__text">{title}</div>
      <Link to={`/${section}/${id}`}>
        {path ? (
          <img className="cover__image" src={`http://localhost:5000/${section}/images/${path}`} alt={title} />
        ) : (
          <NoImage className="cover__image" src={noimage} alt={title} />
        )}
      </Link>
    </div>
  );
};

export default Cover;
