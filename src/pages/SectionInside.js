import { useState, useEffect } from "react";
import { fetchDocument } from "../services/services";
import SectionInsideImage from "../components/SectionInsideImage";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./SectionInside.css";

const SectionInside = props => {
  const [images, setImages] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [year, setYear] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [imagesCount, setImagesCount] = useState(0);

  async function fetchData() {
    setIsLoading(true);
    setLoadCount(0);
    try {
      const section = props.match.params.section;
      const id = props.match.params.id;
      const document = await fetchDocument({ section, id });
      setImages(
        document.data.images.map(image => {
          return <SectionInsideImage path={image.path} key={image._id} section={section} setLoadCount={setLoadCount} />;
        })
      );
      setSubtitle(document.data.subtitle);
      setYear(document.data.year);
      setText(document.data.text);
      setImagesCount(document.data.images.length);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("loaded " + loadCount);
    console.log("images length: " + imagesCount);
    if (loadCount && imagesCount === loadCount) {
      setIsLoading(false);
    }
  }, [loadCount, imagesCount]);

  return (
    <div>
      <LinearProgress className={!isLoading && "sectionInside__hidden"} />
      <div className={`sectionInside__container ${isLoading && "sectionInside__hidden"}`}>
        <h3 className="sectionInside__title">{subtitle}</h3>
        <section>
          <div>{images}</div>
        </section>
        <section className="sectionInside__textSection">
          <h3 className="sectionInside__title">{subtitle}</h3>
          <h6 style={{ fontWeight: "700", marginTop: "-1em" }}>{year}</h6>
          <p className="sectionInside__text">{text}</p>
        </section>
      </div>
    </div>
  );
};

export default SectionInside;
