import { useState, useEffect } from "react";
import { fetchCollection } from "../services/services";
import SectionInsideImage from "../components/SectionInsideImage";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./SectionInside.css";

const Documentacion = ({ section }) => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [imagesCount, setImagesCount] = useState(0);

  async function fetchData() {
    setIsLoading(true);
    setLoadCount(0);
    try {
      const response = await fetchCollection(section);
      console.log(response);
      const document = response.data[0];
      setImages(
        document.images.map(image => {
          return <SectionInsideImage path={image.path} key={image._id} section={section} setLoadCount={setLoadCount} />;
        })
      );
      setText(document.text);
      setImagesCount(document.images.length);
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
        <h3 className="sectionInside__title">Documentación</h3>
        <section>
          <div>{images}</div>
        </section>
        <section className="sectionInside__textSection">
          <p className="mt-3">{text}</p>
        </section>
      </div>
    </div>
  );
};

export default Documentacion;
