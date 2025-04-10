"use client";

import ReactDOM from "react-dom";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type ModalType = {
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const Modal = ({ onClose, onConfirm, message }: ModalType) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-primary/50 z-500"
      onClick={onClose}
    >
      <div className="bg-white text-primary w-1/4 max-w-[250px] h-auto flex flex-col justify-center items-center p-5 rounded-md">
        <h3>{message}</h3>
        <div className="flex gap-x-2 mt-4">
          <Button variant="primary" onClick={onClose}>
            Odustani
          </Button>
          <Button onClick={onConfirm} variant="danger">
            Potvrdi
          </Button>
        </div>
      </div>
    </div>,
    document.body // This renders the modal into the body element
  );
};

export default Modal;
