import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const WarningModal = ({ showWarningModal, setShowWarningModal, handleSubmit }) => {
  const handleClose = () => {
    setShowWarningModal(false);
  };

  return (
    <Modal show={showWarningModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>¡Cuidado!</Modal.Title>
      </Modal.Header>
      <Modal.Body>La entrada se eliminará definitivamente.</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleSubmit} name="deleteDocument">
          Eliminar definitivamente
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          No, limé
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningModal;
