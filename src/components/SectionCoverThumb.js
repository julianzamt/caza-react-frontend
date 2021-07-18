import Image from "react-bootstrap/Image";
import "./SectionCoverThumb.css";

const SectionCoverThumb = ({ path, section, title }) => {
  return (
    <div className="sectionCoverThumb__container">
      <span className="sectionCoverThumb__text">{title}</span>
      <Image className="sectionCoverThumb__thumbnail" src={`http://localhost:5000/${section}/images/${path}`} alt="section cover" thumbnail />
    </div>
  );
};

export default SectionCoverThumb;
