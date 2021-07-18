import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { fetchCollection, updateCoversOrder } from "../services/services";
import { successMessages, errorMessages } from "../utils/feedbackMessages";
import SectionCoverThumb from "./SectionCoverThumb";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CoverOrderForm = ({ setFeedback, section }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [collection, setCollection] = useState("");
  const [disableNewOrderButton, setDisableNewOrderButton] = useState(true);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  async function fetchSectionData() {
    try {
      setIsLoading(true);
      const res = await fetchCollection(section);
      setCollection(
        res.data.map(item => {
          console.log(item);
          return item;
        })
      );
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

  const handleSubmit = async event => {
    event.preventDefault();
    setFeedback("");
    try {
      setIsSavingOrder(true);
      await updateCoversOrder({ collection, section });
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
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    setDisableNewOrderButton(false);
    let items = Array.from(collection);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCollection(items);
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <Form className="mb-2" onSubmit={handleSubmit}>
            <Form.Group>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="imagesPreview">
                  {provided => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="editForm__droppable">
                      {collection ? (
                        collection.map((document, index) => (
                          <Draggable key={document._id} draggableId={document._id} index={index}>
                            {provided => (
                              <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <SectionCoverThumb path={document.cover[0].path} section={section} title={document.title} />
                              </li>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <p>Aún no se ha creado ninguna entrada en esta sección.</p>
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </Form.Group>
            <Form.Group>
              {isSavingOrder ? (
                <div className="editForm__saving_container">
                  <Spinner animation="grow" variant="success" /> &nbsp; Guardando. Esto puede demorar unos minutos.
                </div>
              ) : (
                <Button size="sm" variant="info" type="submit" disabled={disableNewOrderButton}>
                  Guardar Nuevo Orden
                </Button>
              )}
            </Form.Group>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CoverOrderForm;
