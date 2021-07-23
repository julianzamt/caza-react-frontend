import { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { deleteImage } from "../services/services";
import { successMessages, errorMessages } from "../utils/feedbackMessages";
import Spinner from "react-bootstrap/Spinner";

const baseUrl = process.env.REACT_APP_DEVELOPMENT_BASE_URL || "https://cazaestudio.herokuapp.com";

const CoverPreview = ({ img, document, setFeedback, setDocument, section }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async event => {
    setIsLoading(true);
    const key = event.target.value;
    const imageId = event.target.id;
    const coverFlag = true;
    try {
      const updatedDocument = await deleteImage(section, document._id, imageId, key, coverFlag);
      setFeedback(successMessages.GENERAL.editOk);
      setIsLoading(false);
      setDocument(updatedDocument.data);
    } catch (e) {
      if (e.response) {
        console.log(e.response);
        setFeedback(e.response.data.message);
      } else {
        console.log(e);
        setFeedback(errorMessages.NO_CONNECTION);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="imagePreview__thumbnail-container" key={img._id}>
      <span>{img.originalName}</span>
      <Image className="imagePreview__thumbnail" src={`${baseUrl}/${section}/images/${img.path}`} alt="interior" thumbnail />
      {isLoading ? (
        <Spinner animation="grow" />
      ) : (
        <Button className="ml-4" variant="outline-danger" onClick={handleClick} id={img._id} value={img.path}>
          x
        </Button>
      )}
    </div>
  );
};

export default CoverPreview;
