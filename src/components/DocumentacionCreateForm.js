import Form from "react-bootstrap/Form";
import FormFile from "react-bootstrap/FormFile";
import { useState, useRef, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { postDocument, fetchCollection } from "../services/services";
import { successMessages, errorMessages } from "../utils/feedbackMessages";

const DocumentacionCreateForm = ({ section, setFeedback, setFormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [imagesToUpload, setImagesToUpload] = useState("");
  const [textError, setTextError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [isSavingDocument, setIsSavingDocument] = useState(false);

  const TEXT_LIMIT = 300;

  async function fetchSectionData() {
    try {
      setIsLoading(true);
      const res = await fetchCollection(section);
      if (res.data.length) {
        setDisableForm(true);
      }
      setIsLoading(false);
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
  }

  useEffect(() => {
    fetchSectionData();
  }, []);

  // Set references to Input Fields for reset
  const imagesRef = useRef();

  const handleSubmit = async event => {
    event.preventDefault();
    setFeedback("");
    setIsSavingDocument(true);
    try {
      await postDocument({ text, imagesToUpload, section });
      if (imagesRef.current) imagesRef.current.value = "";
      setFeedback(successMessages.GENERAL.createOk);
      setIsSavingDocument(false);
      setFormType("");
    } catch (e) {
      if (e.response) {
        if (imagesRef.current) imagesRef.current.value = "";
        console.log(e.response);
        setFeedback(e.response.data.message);
      } else {
        console.log(e);
        setFeedback(errorMessages.NO_CONNECTION);
      }
      setIsSavingDocument(false);
    }
  };

  const handleChange = event => {
    const name = event.target.name;
    if (name === "images") {
      setImagesToUpload(event.target.files);
    } else if (name === "text") {
      setText(event.target.value);
      if (event.target.value.length >= TEXT_LIMIT) {
        setTextError(true);
        setDisableButton(true);
      } else if (event.target.value.length < TEXT_LIMIT) {
        setTextError(false);
        setDisableButton(false);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          {disableForm ? (
            <div style={{ color: "red", textAlign: "center" }}>
              Sólo puede crearse una única entrada en esta sección. Edite la actual o elimínela para crear una nueva.
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="text">Texto interior: </Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  name="text"
                  value={text}
                  onChange={handleChange}
                  placeholder="Texto interior"
                  maxLength={TEXT_LIMIT}
                />
                {textError && <Form.Text style={{ color: "red" }}>{`El texto principal no puede superar los ${TEXT_LIMIT} caracteres.`}</Form.Text>}
              </Form.Group>
              <Form.Group>
                <FormFile.Label htmlFor="images">Imágenes interiores: </FormFile.Label>
                <Form.File ref={imagesRef} onChange={handleChange} accept="image/*" name="images" multiple />
              </Form.Group>
              <Form.Group>
                {isSavingDocument ? (
                  <div className="editForm__saving_container mt-5">
                    <Spinner animation="grow" variant="success" /> &nbsp; &nbsp;Guardando. Esto puede demorar unos minutos.
                  </div>
                ) : (
                  <Button type="submit" disabled={disableButton} block className="mt-5">
                    Crear entrada
                  </Button>
                )}
              </Form.Group>
            </Form>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentacionCreateForm;
