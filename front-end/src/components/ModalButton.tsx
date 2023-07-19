import { Modal } from "./Modal";
import { ReactNode, useState } from "react"
import "../css/Modal.css"
import "../css/utility-css.css"


export function ModalButton(props: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="button modal-button" onClick={() => setShowModal(true)}>
        Add
      </button>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        {props.children}
      </Modal>
    </>
  );
}
