import "./SectionInsideImage.css";

const SectionInsideImage = ({ section, path, setLoadCount }) => {
  return (
    <div className="sectionInsideImage__container">
      <img
        className="sectionInsideImage__image"
        src={`http://localhost:5000/${section}/images/${path}`}
        alt={`imagen de ${section}`}
        onLoad={() => setLoadCount(prev => prev + 1)}
      />
    </div>
  );
};

export default SectionInsideImage;
