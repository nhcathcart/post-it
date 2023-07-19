import { ReactNode } from "react"
import "../css/Modal.css";

interface props {
  isVisible: boolean;
  onClose: Function;
  children: ReactNode;
}

export function Modal({ isVisible, onClose, children }: props) {
  if (!isVisible) return null;
  function handleClose(e: any) {
    if (e.target.id === "modal-wrapper") {
      onClose();
    }
  }

  return (
    <div
      className="modal-wrapper"
      id="modal-wrapper"
      onClick={(e) => handleClose(e)}
    >
      <div className="modal-content">{children}</div>
    </div>
  );
}
