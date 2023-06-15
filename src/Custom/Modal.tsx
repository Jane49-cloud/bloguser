import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="modal-overlay d-flex align-items-center justify-content-center">
      <div
        className="modal-content bg-light rounded p-4 shadow"
        style={{ width: "400px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
