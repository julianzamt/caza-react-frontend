import Form from "react-bootstrap/Form";
import FormFile from "react-bootstrap/FormFile";
import { useState, useRef, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { deleteDocument, fetchCollection, updateCover, updateText, updateImages, updateOrder } from "../services/services";
import { successMessages } from "../utils/successMessages";
import CoverPreview from "../components/CoverPreview";
import ImagePreview from "../components/ImagePreview";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import WarningModal from "./WarningModal";
import "./EditForm.css";

const EditForm = ({ setFeedback, section, setFormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [collection, setCollection] = useState("");
  const [document, setDocument] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [year, setYear] = useState("");
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [subtitleError, setSubtitleError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [disablePostText, setDisablePostText] = useState(false);
  const [images, setImages] = useState("");
  const [imagesToUpload, setImagesToUpload] = useState("");
  const [cover, setCover] = useState("");
  const [coverToUpload, setCoverToUpload] = useState("");
  const [disableNewOrderButton, setDisableNewOrderButton] = useState(true);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const TEXT_LIMIT = 300;
  const TITLE_LIMIT = 25;
  const SUBTITLE_LIMIT = 50;
  const YEAR_FIXED = 4;

  // Set references to Input Fields for reset
  const coverRef = useRef();
  const imagesRef = useRef();

  async function fetchSectionData() {
    try {
      const res = await fetchCollection(section);
      setCollection(res.data.map(item => item));
    } catch (e) {
      console.log(e);
      setFeedback(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchSectionData();
  }, []);

  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setSubtitle(document.subtitle);
      setYear(document.year);
      setText(document.text);
      setImages(document.images);
      document.cover && setCover(document.cover[0]);
      setDisablePostText(true);
      setDisableNewOrderButton(true);
    }
  }, [document]);

  useEffect(() => {
    titleError || subtitleError || yearError || textError ? setDisablePostText(true) : setDisablePostText(false);
  }, [titleError, subtitleError, yearError, textError, setDisablePostText]);

  const handleSubmit = async event => {
    event.preventDefault();
    const action = event.target.name;
    setFeedback("");
    setIsLoading(true);
    if (action === "updateCover") {
      const documentId = document._id;
      try {
        const updatedDocument = await updateCover({ coverToUpload, section, documentId });
        setDocument(updatedDocument.data);
        coverRef.current.value = "";
        setCoverToUpload("");
        fetchSectionData();
        setFeedback(successMessages.GENERAL.editOk);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
        coverRef.current.value = "";
        setFeedback(e.response.data.message);
        setIsLoading(false);
      }
    } else if (action === "updateText") {
      const documentId = document._id;
      try {
        const updatedDocument = await updateText({ title, subtitle, year, text, section, documentId });
        setDocument(updatedDocument.data);
        fetchSectionData();
        setFeedback(successMessages.GENERAL.editOk);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
        setFeedback(e.response.data.message);
        setIsLoading(false);
      }
    } else if (action === "updateImages") {
      const documentId = document._id;
      try {
        const updatedDocument = await updateImages({ imagesToUpload, section, documentId });
        setDocument(updatedDocument.data);
        imagesRef.current.value = "";
        setImagesToUpload("");
        fetchSectionData();
        setFeedback(successMessages.GENERAL.editOk);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
        imagesRef.current.value = "";
        setFeedback(e.response.data.message);
        setIsLoading(false);
      }
    } else if (action === "updateOrder") {
      const documentId = document._id;
      try {
        const updatedDocument = await updateOrder({ images, section, documentId });
        setDocument(updatedDocument.data);
        fetchSectionData();
        setFeedback(successMessages.GENERAL.editOk);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
        setFeedback(e.response.data.message);
        setIsLoading(false);
      }
    } else if (action === "deleteDocument") {
      const documentId = document._id;
      try {
        await deleteDocument({ section, documentId });
        setFeedback(successMessages.GENERAL.deleteOk);
        setIsLoading(false);
        setFormType("");
      } catch (e) {
        console.log(e.response);
        setFeedback(e.response.data.message);
        setIsLoading(false);
      }
    }
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    setDisableNewOrderButton(false);
    let items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  };

  const handleChange = event => {
    const name = event.target.name;
    if (name === "images") {
      setImagesToUpload(event.target.files);
    } else if (name === "cover") {
      setCoverToUpload(event.target.files[0]);
    } else if (name === "title") {
      setTitle(event.target.value);
      setDisablePostText(false);
      if (event.target.value.length >= TITLE_LIMIT) {
        setTitleError(true);
      } else if (event.target.value.length < TITLE_LIMIT) {
        setTitleError(false);
      }
    } else if (name === "subtitle") {
      setSubtitle(event.target.value);
      setDisablePostText(false);
      if (event.target.value.length >= SUBTITLE_LIMIT) {
        setSubtitleError(true);
      } else if (event.target.value.length < SUBTITLE_LIMIT) {
        setSubtitleError(false);
      }
    } else if (name === "year") {
      setYear(event.target.value);
      setDisablePostText(false);
      if (event.target.value.length !== YEAR_FIXED) {
        setYearError(true);
      }
      if (event.target.value.length === YEAR_FIXED || !event.target.value.length) {
        setYearError(false);
      }
    } else if (name === "text") {
      setText(event.target.value);
      setDisablePostText(false);
      if (event.target.value.length >= TEXT_LIMIT) {
        setTextError(true);
      } else if (event.target.value.length < TEXT_LIMIT) {
        setTextError(false);
      }
    } else if (name === "obraSelect") {
      setDocument(
        collection.find(document => {
          return document["_id"] === event.target.value;
        })
      );
    }
  };

  const handleShow = () => {
    setShowWarningModal(true);
  };

  return (
    <div>
      <Form className="mb-2">
        <Form.Group>
          <Form.Label htmlFor="obra">Selecciona la entrada</Form.Label>
          <Form.Control as="select" onChange={handleChange} name="obraSelect">
            <option value="">---</option>
            {collection &&
              collection.map(document => (
                <option value={document._id} key={document._id}>
                  {document.title}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </Form>
      {document && (
        <div className="border-top pt-2">
          <Form onSubmit={handleSubmit} name="updateText">
            <Form.Group>
              <Form.Label htmlFor="title">Nombre corto para portada: </Form.Label>
              <Form.Control
                type="text"
                required
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Nombre corto"
                maxLength={TITLE_LIMIT}
              />
              {titleError && <Form.Text style={{ color: "red" }}>{`El título de portada no puede superar los ${TITLE_LIMIT} caracteres.`}</Form.Text>}
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
              {subtitleError && (
                <Form.Text style={{ color: "red" }}>{`El título interior no puede superar los ${SUBTITLE_LIMIT} caracteres.`}</Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="year">Año: </Form.Label>
              <Form.Control type="number" required name="year" value={year} onChange={handleChange} placeholder="Formato: yyyy" />
              {yearError && <Form.Text style={{ color: "red" }}>{`El año debe expresarse en ${YEAR_FIXED} caracteres.`}</Form.Text>}
            </Form.Group>
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
              {isLoading ? (
                <Spinner animation="grow" />
              ) : (
                <Button size="sm" variant="info" type="submit" disabled={disablePostText}>
                  Guardar edición de texto
                </Button>
              )}
            </Form.Group>
          </Form>

          <Form onSubmit={handleSubmit} name="updateCover" className="border-top pt-2">
            <Form.Group>
              <p>Portada actual (eliminarla primero para poder elegir una nueva): </p>
              {cover ? (
                <CoverPreview img={cover} setDocument={setDocument} setFeedback={setFeedback} document={document} section={section} />
              ) : (
                <p>No se ha seleccionado portada aún</p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.File>
                <FormFile.Input ref={coverRef} onChange={handleChange} accept="image/*" name="cover" disabled={cover ? true : false} />
              </Form.File>
            </Form.Group>
            <Form.Group>
              {isLoading ? (
                <Spinner animation="grow" />
              ) : (
                <Button size="sm" variant="info" type="submit" disabled={coverToUpload ? false : true}>
                  Guardar Nueva Portada
                </Button>
              )}
            </Form.Group>
          </Form>

          <Form onSubmit={handleSubmit} name="updateOrder" className="border-top pt-2">
            <Form.Group>
              <p>Orden de imágenes interiores (Arrastrar y soltar):</p>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="imagesPreview">
                  {provided => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="editForm__droppable">
                      {images ? (
                        images.map((img, index) => (
                          <Draggable key={img._id} draggableId={img._id} index={index}>
                            {provided => (
                              <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <ImagePreview img={img} setDocument={setDocument} setFeedback={setFeedback} document={document} section={section} />
                              </li>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <p>No se han seleccionado imágenes interiores aún</p>
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </Form.Group>
            <Form.Group>
              {isLoading ? (
                <Spinner animation="grow" />
              ) : (
                <Button size="sm" variant="info" type="submit" disabled={disableNewOrderButton}>
                  Guardar Nuevo Orden
                </Button>
              )}
            </Form.Group>
          </Form>

          <Form onSubmit={handleSubmit} name="updateImages" className="border-top pt-2">
            <p>Agregar imágenes interiores (Se agregarán al final del orden actual):</p>
            <Form.Group>
              <FormFile ref={imagesRef} onChange={handleChange} accept="image/*" name="images" multiple />
            </Form.Group>
            <Form.Group>
              {isLoading ? (
                <Spinner animation="grow" />
              ) : (
                <Button size="sm" variant="info" type="submit" disabled={imagesToUpload ? false : true}>
                  Guardar Nuevas Imágenes
                </Button>
              )}
            </Form.Group>
          </Form>

          {isLoading ? (
            <Spinner animation="grow" />
          ) : (
            <div>
              <Button className="mt-5" variant="danger" size="sm" block onClick={handleShow}>
                Eliminar entrada
              </Button>
            </div>
          )}
          <WarningModal showWarningModal={showWarningModal} setShowWarningModal={setShowWarningModal} handleSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default EditForm;
