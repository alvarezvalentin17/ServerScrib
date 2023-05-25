import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Modals({
  typeModal,
  btn,
  title,
  body,
  btn_save,
  fun_save,
  btn_close,
}) {
  const values = [typeModal];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  };

  return (
    <>
      {values.map((v, idx) => (
        <div className="inline" key={idx} onClick={() => handleShow(v)}>
          {btn}
        </div>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
          {btn_close ? (
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShow(false)}
              >
                {btn_close}
              </button>
              {btn_save ? (
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => (setShow(false), fun_save())}
                  >
                    Guardar
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modals;
