import NoImage from "../components/NoImage";
import "./Cover.css";

const Cover = ({ path, title, section, setLoadCount }) => {
  return (
    <div className="cover__container">
      <div className="cover__dark-overlay"></div>
      <div className="cover__text">{title}</div>
      {path ? (
        <img
          className="cover__image"
          src={`http://localhost:5000/${section}/images/${path}`}
          alt={title}
          onLoad={() => setLoadCount(prev => prev + 1)}
        />
      ) : (
        <NoImage className="cover__image" alt={title} setLoadCount={setLoadCount} />
      )}
    </div>
  );
};

export default Cover;
