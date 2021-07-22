import Image from "react-bootstrap/Image";
import NoImage from "./NoImage";
import "./SectionCoverThumb.css";
import React, { useState } from "react";

const SectionCoverThumb = ({ path, section, title }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="sectionCoverThumb__container">
      <span className="sectionCoverThumb__text">{title}</span>
      {path ? (
        <Image
          className={visible ? "thumbnail visible fade-in-fwd" : "hidden"}
          src={`http://localhost:5000/${section}/images/${path}`}
          alt="section cover"
          onLoad={() => setVisible(true)}
          thumbnail
        />
      ) : (
        <NoImage thumbnail={true} />
      )}
    </div>
  );
};

export default SectionCoverThumb;
