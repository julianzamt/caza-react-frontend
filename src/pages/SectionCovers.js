import { useState, useEffect } from "react";
import { fetchCollection } from "../services/services";
import "./SectionCovers.css";
import Cover from "../components/Cover";
import { Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const SectionCovers = ({ section }) => {
  const [covers, setCovers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [coversCount, setCoversCount] = useState(0);

  async function fetchCovers() {
    try {
      setIsLoading(true);
      setLoadCount(0);
      const collection = await fetchCollection(section);
      setCovers(
        collection.data.map(document => (
          <Link to={`/${section}/${document._id}`} key={document._id}>
            <Cover path={document.cover[0] && document.cover[0].path} title={document.title} section={section} setLoadCount={setLoadCount} />
          </Link>
        ))
      );
      setCoversCount(collection.data.length);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCovers();
  }, [section]);

  useEffect(() => {
    console.log("loaded " + loadCount);
    console.log("covers length: " + coversCount);
    if (loadCount && coversCount === loadCount) {
      setIsLoading(false);
    }
  }, [loadCount, coversCount]);

  return (
    <div>
      <LinearProgress className={!isLoading && "sectionCovers__hidden"} />
      <div className={`sectionCovers__container ${isLoading && "sectionCovers__hidden"}`}>
        <h3 className="sectionCovers__title">{section}</h3>
        <div className="sectionCovers__covers_container">{covers}</div>
      </div>
    </div>
  );
};

export default SectionCovers;
