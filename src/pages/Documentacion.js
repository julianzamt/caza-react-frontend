import { useState, useEffect } from "react";
import { fetchCollection } from "../services/services";
import SectionInsideImage from "../components/SectionInsideImage";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./SectionInside.css";

const Documentacion = ({ section }) => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetchCollection(section);
      console.log(response);
      const document = response.data[0];
      setImages(
        document.images.map(image => {
          return <SectionInsideImage path={image.path} key={image._id} section={section} />;
        })
      );
      setText(document.text);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div className="sectionInside__container">
          <h3 className="sectionInside__title">Documentación</h3>
          <section>
            <div>{images}</div>
          </section>
          <section className="sectionInside__textSection">
            <p className="mt-3">{text}</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default Documentacion;
