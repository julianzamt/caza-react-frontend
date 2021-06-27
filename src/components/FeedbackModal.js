import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { successMessages } from "../utils/feedbackMessages";

const FeedbackModal = ({ feedback, setFeedback }) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(true);

  const handleClose = () => {
    setShowFeedbackModal(false);
    setFeedback(false);
  };
  const handleShow = () => setShowFeedbackModal(true);

  useEffect(() => {
    feedback && handleShow();
  }, [feedback]);

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showFeedbackModal} onHide={handleClose}>
      <Modal.Body style={{ padding: 0 }}>
        <Alert
          style={{ margin: 0, textAlign: "center" }}
          variant={
            feedback === successMessages.GENERAL.editOk ||
            feedback === successMessages.GENERAL.createOk ||
            feedback === successMessages.GENERAL.deleteOk
              ? "success"
              : "danger"
          }>
          {feedback}
        </Alert>
      </Modal.Body>
    </Modal>
  );
};

export default FeedbackModal;
