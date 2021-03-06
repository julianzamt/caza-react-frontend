import Form from "react-bootstrap/Form";
import FormFile from "react-bootstrap/FormFile";
import { useState, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { postDocument } from "../services/services";
import { successMessages, errorMessages } from "../utils/feedbackMessages";

const CreateForm = ({ section, setFeedback, setFormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [year, setYear] = useState("");
  const [text, setText] = useState("");
  const [coverToUpload, setCoverToUpload] = useState("");
  const [imagesToUpload, setImagesToUpload] = useState("");
  const [textError, setTextError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [subtitleError, setSubtitleError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const TEXT_LIMIT = 300;
  const TITLE_LIMIT = 25;
  const SUBTITLE_LIMIT = 50;
  const YEAR_FIXED = 4;

  // Set references to Input Fields for reset
  const coverRef = useRef();
  const imagesRef = useRef();

  const handleSubmit = async event => {
    event.preventDefault();
    setFeedback("");
    setIsLoading(true);
    try {
      await postDocument({ title, subtitle, year, text, coverToUpload, imagesToUpload, section });
      coverRef.current.value = "";
      imagesRef.current.value = "";
      setFeedback(successMessages.GENERAL.createOk);
      setIsLoading(false);
      setFormType("");
    } catch (e) {
      if (e.response) {
        coverRef.current.value = "";
        imagesRef.current.value = "";
        console.log(e.response);
        setFeedback(e.response.data.message);
      } else {
        console.log(e);
        setFeedback(errorMessages.NO_CONNECTION);
      }
      setIsLoading(false);
    }
  };

  const handleChange = event => {
    const name = event.target.name;
    if (name === "images") {
      setImagesToUpload(event.target.files);
    } else if (name === "cover") {
      setCoverToUpload(event.target.files[0]);
    } else if (name === "title") {
      setTitle(event.target.value);
      if (event.target.value.length >= TITLE_LIMIT) {
        setTitleError(true);
        setDisableButton(true);
      } else if (event.target.value.length < TITLE_LIMIT) {
        setTitleError(false);
        setDisableButton(false);
      }
    } else if (name === "subtitle") {
      setSubtitle(event.target.value);
      if (event.target.value.length >= SUBTITLE_LIMIT) {
        setSubtitleError(true);
        setDisableButton(true);
      } else if (event.target.value.length < SUBTITLE_LIMIT) {
        setSubtitleError(false);
        setDisableButton(false);
      }
    } else if (name === "year") {
      setYear(event.target.value);
      if (event.target.value.length !== YEAR_FIXED) {
        setYearError(true);
        setDisableButton(true);
      }
      if (event.target.value.length === YEAR_FIXED || !event.target.value.length) {
        setYearError(false);
        setDisableButton(false);
      }
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
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="title">Nombre corto para portada: </Form.Label>
        <Form.Control type="text" required name="title" value={title} onChange={handleChange} placeholder="Nombre corto" maxLength={TITLE_LIMIT} />
        {titleError && <Form.Text style={{ color: "red" }}>{`El t??tulo de portada no puede superar los ${TITLE_LIMIT} caracteres.`}</Form.Text>}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="subtitle">Nombre largo para texto interior: </Form.Label>
        <Form.Control
          type="text"
          required
          name="subtitle"
          value={subtitle}
          onChange={handleChange}
          placeholder="Nombre largo"
          maxLength={SUBTITLE_LIMIT}
        />
        {subtitleError && <Form.Text style={{ color: "red" }}>{`El t??tulo interior no puede superar los ${SUBTITLE_LIMIT} caracteres.`}</Form.Text>}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="year">A??o: </Form.Label>
        <Form.Control type="number" required name="year" value={year} onChange={handleChange} placeholder="A??o" />
        {yearError && <Form.Text style={{ color: "red" }}>{`El a??o debe expresarse en ${YEAR_FIXED} caracteres.`}</Form.Text>}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="text">Texto interior: </Form.Label>
        <Form.Control as="textarea" required name="text" value={text} onChange={handleChange} placeholder="Texto interior" maxLength={TEXT_LIMIT} />
        {textError && <Form.Text style={{ color: "red" }}>{`El texto principal no puede superar los ${TEXT_LIMIT} caracteres.`}</Form.Text>}
      </Form.Group>
      <Form.Group>
        <FormFile.Label htmlFor="cover">Imagen de portada: </FormFile.Label>
        <Form.File ref={coverRef} onChange={handleChange} accept="image/*" name="cover" />
      </Form.Group>
      <Form.Group>
        <FormFile.Label htmlFor="images">Im??genes interiores: </FormFile.Label>
        <Form.File ref={imagesRef} onChange={handleChange} accept="image/*" name="images" multiple />
      </Form.Group>

      {isLoading ? (
        <div className="editForm__saving_container mt-5">
          <Spinner animation="grow" variant="success" /> &nbsp; &nbsp;Guardando. Esto puede demorar unos minutos.
        </div>
      ) : (
        <Button type="submit" disabled={disableButton} block className="mt-5">
          Crear entrada
        </Button>
      )}
    </Form>
  );
};

export default CreateForm;
