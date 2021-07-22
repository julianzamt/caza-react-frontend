import { useState, useEffect } from "react";
import { fetchCollection } from "../services/services";
import "./SectionCovers.css";
import Cover from "../components/Cover";
import { Link } from "react-router-dom";

const SectionCovers = ({ section }) => {
  const [covers, setCovers] = useState([]);
  const [threeColumns, setThreeColumns] = useState(false);

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
  }

  const forceUpdate = useForceUpdate();

  async function fetchCovers() {
    try {
      const collection = await fetchCollection(section);
      setCovers(
        collection.data.map(document => (
          <Link to={`/${section}/${document._id}`} key={document.title}>
            <Cover path={document.cover[0] && document.cover[0].path} title={document.title} section={section} />
          </Link>
        ))
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCovers();
    forceUpdate();
    section === "productos" ? setThreeColumns(true) : setThreeColumns(false);
  }, [section]);

  return (
    <div>
      <div className={threeColumns ? `sectionCovers__container_threeColumns` : "sectionCovers__container_twoColumns"}>
        {/* <h3 className="sectionCovers__title">{section}</h3> */}
        {covers}
      </div>
    </div>
  );
};

export default SectionCovers;
