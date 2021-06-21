import { useState, useEffect } from "react";
import { fetchDocument } from "../services/services";
import { errorMessages } from "../utils/errorMessages";
import SectionInsideImage from "../components/SectionInsideImage";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./SectionInside.css";

const SectionInside = props => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [year, setYear] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function fetchData() {
    setIsLoading(true);
    setFeedback("");
    try {
      const section = props.match.params.section;
      const id = props.match.params.id;
      const document = await fetchDocument({ section, id });
      setImages(
        document.data.images.map(image => {
          return <SectionInsideImage path={image.path} key={image._id} section={section} />;
        })
      );
      setTitle(document.data.title);
      setSubtitle(document.data.subtitle);
      setYear(document.data.year);
      setText(document.data.text);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setFeedback(errorMessages.ERROR);
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
          <h3 className="sectionInside__title">{subtitle}</h3>
          <section>
            <div>{images}</div>
          </section>
          <section className="sectionInside__textSection">
            <h3 className="sectionInside__title">{subtitle}</h3>
            <h6 style={{ fontWeight: "700" }}>{year}</h6>
            <p className="sectionInside__text">{text}</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default SectionInside;
