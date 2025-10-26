import { useRef, useImperativeHandle, forwardRef } from "react";
import type { IOrthography } from "@ethnolib/find-language";
import { LanguageChooser } from "./LanguageChooser";

interface LanguageChooserModalProps {
  onOrthographyChange: (orthography: IOrthography, languageTag?: string) => void;
}

export interface LanguageChooserModalHandle {
  show: () => void;
}

export const LanguageChooserModal = forwardRef<
  LanguageChooserModalHandle,
  LanguageChooserModalProps
>(function LanguageChooserModal({ onOrthographyChange }, ref) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.showModal();
    },
  }));

  const handleDismiss = () => {
    modalRef.current?.close();
  };

  const handleOk = (orthography: IOrthography, languageTag?: string) => {
    onOrthographyChange(orthography, languageTag);
    modalRef.current?.close();
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-11/12 max-w-4xl h-4/5 p-0">
        <LanguageChooser onDismiss={handleDismiss} onOk={handleOk} />
      </div>
    </dialog>
  );
});
