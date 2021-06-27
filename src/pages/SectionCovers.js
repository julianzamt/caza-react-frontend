import { useState, useEffect } from "react";
import { fetchCollection } from "../services/services";
import "./SectionCovers.css";
import Cover from "../components/Cover";
import { Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const SectionCovers = ({ section }) => {
  const [covers, setCovers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCovers() {
    try {
      setIsLoading(true);
      const collection = await fetchCollection(section);
      setCovers(
        collection.data.map(document => (
          <Link to={`/${section}/${document._id}`} key={document._id}>
            <Cover path={document.cover[0] && document.cover[0].path} title={document.title} section={section} />
          </Link>
        ))
      );
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCovers();
  }, [section]);

  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div className="sectionCovers__container">
          <h3 className="sectionCovers__title">{section}</h3>
          <div className="sectionCovers__covers_container">{covers}</div>
        </div>
      )}
    </div>
  );
};

export default SectionCovers;
