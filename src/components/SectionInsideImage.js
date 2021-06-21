import "./SectionInsideImage.css";

const SectionInsideImage = ({ section, path }) => {
  return (
    <div className="sectionInsideImage__container">
      <img className="sectionInsideImage__image" src={`http://localhost:5000/${section}/images/${path}`} alt="obra" />
    </div>
  );
};

export default SectionInsideImage;
