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
      <div className="bg-white text-primary w-1/4 max-w-[250px] h-auto flex flex-col justify-center items-center rounded-md">
        <h2 className="w-full text-center py-2 border-b border-gray-300 text-[20px] bg-primary text-white">
          {message}
        </h2>
        <div className="flex gap-5 mt-4 pb-5">
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
