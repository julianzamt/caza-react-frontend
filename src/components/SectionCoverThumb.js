import Image from "react-bootstrap/Image";
import NoImage from "./NoImage";
import "./SectionCoverThumb.css";
import React, { useState } from "react";

const baseUrl = process.env.REACT_APP_DEVELOPMENT_BASE_URL || "https://cazaestudio.herokuapp.com";

const SectionCoverThumb = ({ path, section, title }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="sectionCoverThumb__container">
      <span className="sectionCoverThumb__text">{title}</span>
      {path ? (
        <Image
          className={visible ? "thumbnail visible fade-in-fwd" : "hidden"}
          src={`${baseUrl}/${section}/images/${path}`}
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
