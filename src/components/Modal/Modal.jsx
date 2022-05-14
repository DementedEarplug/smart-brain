import React, {useRef, useEffect} from "react";
import reactDOM from "react-dom";

import "./Modal.css";

const Modal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");

  //we use useRef here to only initialize el once and not recreate it on every rerender, which would cause bugs
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    modalRoot.appendChild(el.current);

    return () => {
      modalRoot.removeChild(el.current);
    };
  }, []);

  return reactDOM.createPortal(children, modalRoot);
};

export default Modal;
