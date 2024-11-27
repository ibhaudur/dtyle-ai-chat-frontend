import * as React from "react";
import { Modal } from "react-bootstrap";

export default function ModalBox({ open, setOpen, title, children }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        className="WorkSans-Regular"
        show={open}
        dialogClassName="modal-dialog-scrollable"
        backdrop="static"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
}
