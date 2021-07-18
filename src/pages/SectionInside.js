import { useState, useEffect } from "react";
import { fetchDocument } from "../services/services";
import SectionInsideImage from "../components/SectionInsideImage";
import "./SectionInside.css";

const SectionInside = props => {
  const [images, setImages] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [year, setYear] = useState("");
  const [text, setText] = useState("");

  async function fetchData() {
    try {
      const section = props.match.params.section;
      const id = props.match.params.id;
      const document = await fetchDocument({ section, id });
      setImages(
        document.data.images.map(image => {
          return <SectionInsideImage path={image.path} key={image._id} section={section} />;
        })
      );
      setSubtitle(document.data.subtitle);
      setYear(document.data.year);
      setText(document.data.text);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className={`sectionInside__container fade-in-fwd`}>
        <h4 className="sectionInside__title">{subtitle}</h4>
        <section>
          <div>{images}</div>
        </section>
        <section className="sectionInside__textSection">
          <h6 className="sectionInside__year">{year}</h6>
          <p className="sectionInside__text">{text}</p>
        </section>
      </div>
    </div>
  );
};

export default SectionInside;
