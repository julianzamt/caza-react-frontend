import Form from "react-bootstrap/Form";
import FormFile from "react-bootstrap/FormFile";
import { useState, useRef, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { deleteDocument, fetchCollection, updateText, updateImages, updateOrder } from "../services/services";
import { successMessages, errorMessages } from "../utils/feedbackMessages";
import ImagePreview from "../components/ImagePreview";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import WarningModal from "./WarningModal";
import "./DocumentacionEditForm.css";

const DocumentacionEditForm = ({ setFeedback, section, setFormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState("");
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);
  const [disablePostText, setDisablePostText] = useState(false);
  const [images, setImages] = useState("");
  const [imagesToUpload, setImagesToUpload] = useState("");
  const [disableNewOrderButton, setDisableNewOrderButton] = useState(true);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isSavingText, setIsSavingText] = useState(false);
  const [isSavingImages, setIsSavingImages] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [isDeletingDocument, setIsDeletingDocument] = useState(false);

  const TEXT_LIMIT = 300;

  // Set references to Input Fields for reset
  const imagesRef = useRef();

  async function fetchSectionData() {
    try {
      setIsLoading(true);
      const res = await fetchCollection(section);
      setDocument(res.data[0]);
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

  useEffect(() => {
    if (document) {
      setText(document.text);
      setImages(document.images);
      setDisablePostText(true);
      setDisableNewOrderButton(true);
    }
  }, [document]);

  useEffect(() => {
    textError ? setDisablePostText(true) : setDisablePostText(false);
  }, [textError, setDisablePostText]);

  const handleSubmit = async event => {
    event.preventDefault();
    const action = event.target.name;
    setFeedback("");
    if (action === "updateText") {
      const documentId = document._id;
      setIsSavingText(true);
      try {
        const updatedDocument = await updateText({ text, section, documentId });
        setDocument(updatedDocument.data);
        fetchSectionData();
        setFeedback(successMessages.GENERAL.editOk);
        setIsSavingText(false);
      } catch (e) {
        if (e.response) {
          console.log(e.response);
          setFeedback(e.response.data.message);
        } else {
          console.log(e);
          setFeedback(errorMessages.NO_CONNECTION);
        }
        setIsSavingText(false);
      }
    } else if (action === "updateImages") {
      const documentId = document._id;
      setIsSavingImages(true);
      try {
        const updatedDocument = await updateImages({ imagesToUpload, section, documentId });
        setDocument(updatedDocument.data);
        imagesRef.current.value = "";
        setImagesToUpload("");
        fetchSectionData();
        setFeedback(successMessages.GENERAL.editOk);
        setIsSavingImages(false);
      } catch (e) {
        if (e.response) {
          console.log(e.response);
          imagesRef.current.value = "";
          setFeedback(e.response.data.message);
        } else {
          console.log(e);
          setFeedback(errorMessages.NO_CONNECTION);
        }
        setIsSavingImages(false);
      }
    } else if (action === "updateOrder") {
      const documentId = document._id;
      setIsSavingOrder(true);
      try {
        const updatedDocument = await updateOrder({ images, section, documentId });
        setDocument(updatedDocument.data);
        fetchSectionData();
        setFeedback(successMessages.GENERAL.editOk);
        setIsSavingOrder(false);
      } catch (e) {
        if (e.response) {
          console.log(e.response);
          setFeedback(e.response.data.message);
        } else {
          console.log(e);
          setFeedback(errorMessages.NO_CONNECTION);
        }
        setIsSavingOrder(false);
      }
    } else if (action === "deleteDocument") {
      const documentId = document._id;
      setIsDeletingDocument(true);
      try {
        await deleteDocument({ section, documentId });
        setFeedback(successMessages.GENERAL.deleteOk);
        setIsDeletingDocument(false);
        setFormType("");
      } catch (e) {
        if (e.response) {
          console.log(e.response);
          setFeedback(e.response.data.message);
        } else {
          console.log(e);
          setFeedback(errorMessages.NO_CONNECTION);
        }
        setIsDeletingDocument(false);
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
    } else if (name === "text") {
      setText(event.target.value);
      setDisablePostText(false);
      if (event.target.value.length >= TEXT_LIMIT) {
        setTextError(true);
      } else if (event.target.value.length < TEXT_LIMIT) {
        setTextError(false);
      }
    }
  };

  const handleShow = () => {
    setShowWarningModal(true);
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />{" "}
        </div>
      ) : (
        <div>
          {document && (
            <div>
              <Form onSubmit={handleSubmit} name="updateText" className="border-top pt-2">
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
                  {isSavingText ? (
                    <div className="documentacionEditForm__saving_container">
                      <Spinner animation="grow" variant="success" /> &nbsp; Guardando. Esto puede demorar unos minutos.
                    </div>
                  ) : (
                    <Button size="sm" variant="info" type="submit" disabled={disablePostText}>
                      Guardar edición de texto
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
                                    <ImagePreview
                                      img={img}
                                      setDocument={setDocument}
                                      setFeedback={setFeedback}
                                      document={document}
                                      section={section}
                                    />
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
                  {isSavingOrder ? (
                    <div className="documentacionEditForm__saving_container">
                      <Spinner animation="grow" variant="success" /> &nbsp; Guardando. Esto puede demorar unos minutos.
                    </div>
                  ) : (
                    <Button size="sm" variant="info" type="submit" disabled={disableNewOrderButton}>
                      Guardar Nuevo Orden
                    </Button>
                  )}
                </Form.Group>
              </Form>

              <Form onSubmit={handleSubmit} name="updateImages" className="border-top pt-2">
                <Form.Group>
                  <Form.Label htmlFor="images">Agregar imágenes interiores (Se agregarán al final del orden actual):</Form.Label>
                  <FormFile ref={imagesRef} onChange={handleChange} accept="image/*" name="images" multiple />

                  {isSavingImages ? (
                    <div className="documentacionEditForm__saving_container mb-5 mt-2">
                      <Spinner animation="grow" variant="success" /> &nbsp; Guardando. Esto puede demorar unos minutos.
                    </div>
                  ) : (
                    <Button className="mb-5" size="sm" variant="info" type="submit" disabled={imagesToUpload ? false : true}>
                      Guardar Nuevas Imágenes
                    </Button>
                  )}
                </Form.Group>
              </Form>
              <Form.Group>
                {isDeletingDocument ? (
                  <div className="documentacionEditForm__saving_container">
                    <Spinner animation="grow" variant="danger" /> &nbsp; &nbsp; Eliminando entrada. Esto puede demorar unos minutos.
                  </div>
                ) : (
                  <div>
                    <Button block variant="danger" size="sm" onClick={handleShow}>
                      Eliminar entrada
                    </Button>
                  </div>
                )}
              </Form.Group>
              <WarningModal showWarningModal={showWarningModal} setShowWarningModal={setShowWarningModal} handleSubmit={handleSubmit} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentacionEditForm;
