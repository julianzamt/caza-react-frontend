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
  }, []);

  return (
    <div>
      <div>{covers}</div>
    </div>
  );
};

export default SectionCovers;
