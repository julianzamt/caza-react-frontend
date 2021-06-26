import { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { deleteImage } from "../services/services";
import { successMessages } from "../utils/successMessages";
import Spinner from "react-bootstrap/Spinner";
import "./ImagePreview.css";

const ImagePreview = ({ img, document, setFeedback, setDocument, section }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async event => {
    setIsLoading(true);
    const key = event.target.value;
    const imageId = event.target.id;
    console.log(section, +" " + document._id, +" " + imageId, +" " + key);
    try {
      const updatedDocument = await deleteImage(section, document._id, imageId, key);
      setFeedback(successMessages.GENERAL.editOk);
      setIsLoading(false);
      setDocument(updatedDocument.data);
    } catch (e) {
      console.log(e.response);
      setFeedback(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="imagePreview__thumbnail-container" key={img._id}>
      <span>{img.originalName}</span>
      <Image className="imagePreview__thumbnail" src={`http://localhost:5000/${section}/images/${img.path}`} alt="interior" thumbnail />
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

export default ImagePreview;
