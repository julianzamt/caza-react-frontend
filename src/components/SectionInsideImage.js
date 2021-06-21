import "./SectionInsideImage.css";

const SectionInsideImage = ({ section, path }) => {
  return (
    <div className="sectionInsideImage__container">
      <img
        className="sectionInsideImage__image"
        src={`http://localhost:5000/${section}/images/${path}`}
        alt={`imagen de ${section}`}
        onLoad={event => (event.target.style.visibility = "visible")}
      />
    </div>
  );
};

export default SectionInsideImage;
