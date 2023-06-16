import React from "react";
import loader from "../assets/loader.gif";

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
        <img src={loader} alt="" width="30px" height={"30px"} />
      </div>
    </div>
  );
};

export default Modal;
