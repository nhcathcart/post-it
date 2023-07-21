import { Modal } from "./Modal";
import { ReactNode, useState } from "react"
import "../css/Modal.css"
import "../css/utility-css.css"


export function ModalButton(props: { children: ReactNode, isDefault: boolean, text: string, cssClass?: string}) {
  const [showModal, setShowModal] = useState(false);
  const { isDefault, cssClass, text } = props;

  return (
    <>
      <button className={isDefault? "button modal-button" : cssClass} onClick={() => setShowModal(true)}>
        {text}
      </button>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        {props.children}
      </Modal>
    </>
  );
}
