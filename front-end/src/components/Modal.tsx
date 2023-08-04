import { ReactElement, ReactNode } from "react";
import "../css/Modal.css";
import React from "react";

interface props {
  isVisible: boolean;
  onClose: Function;
  children: ReactElement;
}

export function Modal({ isVisible, onClose, children }: props) {
  if (!isVisible) return null;
  function handleClose(e: any) {
    if (e.target.id === "modal-wrapper") {
      onClose();
    }
  }

  const childWithProps = React.cloneElement(children, {onClose: onClose})
  
  return (
    <div
      className="modal-wrapper"
      id="modal-wrapper"
      onClick={(e) => handleClose(e)}
    >
      <div className="modal-content">
        {childWithProps}
      </div>
    </div>
  );
}
