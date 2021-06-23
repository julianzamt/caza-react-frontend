import { useState, useEffect } from "react";
import { fetchCollection } from "../services/services";
import "./SectionCovers.css";
import Cover from "../components/Cover";

const SectionCovers = ({ section }) => {
  const [covers, setCovers] = useState([]);

  async function fetchCovers() {
    try {
      const collection = await fetchCollection(section);
      setCovers(
        collection.data.map(document => (
          <Cover
            path={document.cover[0] ? document.cover[0].path : null}
            title={document.title}
            key={document._id}
            id={document._id}
            section={section}
          />
        ))
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCovers();
  }, [section]);

  return (
    <div className="sectionCovers__container">
      <h3 className="sectionCovers__title">{section}</h3>
      <div className="sectionCovers__covers_container">{covers}</div>
    </div>
  );
};

export default SectionCovers;
