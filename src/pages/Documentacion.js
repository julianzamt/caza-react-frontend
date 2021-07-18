import { useState, useEffect } from "react";
import { fetchCollection } from "../services/services";
import DocumentacionInsideImage from "../components/DocumentacionInsideImage";
import "./Documentacion.css";

const Documentacion = ({ section }) => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");

  async function fetchData() {
    try {
      const response = await fetchCollection(section);
      const document = response.data[0];
      setImages(
        document.images.map(image => {
          return <DocumentacionInsideImage path={image.path} key={image._id} section={section} />;
        })
      );
      setText(document.text);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className={`documentacion__container fade-in-fwd`}>
        {/* <h3 className="sectionInside__title">Documentación</h3> */}
        <div className="documentacion__imageContainer">{images}</div>
        <div className="documentacion__text">{text}</div>
      </div>
    </div>
  );
};

export default Documentacion;
