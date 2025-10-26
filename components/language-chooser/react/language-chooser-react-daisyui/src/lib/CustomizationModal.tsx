import React, { useRef, useEffect, useState, useCallback } from "react";
import { useField } from "@ethnolib/state-management-react";
import {
  type IRegion,
  type IScript,
} from "@ethnolib/find-language";
import { UnlistedLanguageForm, type UnlistedLanguageFormHandle } from "./UnlistedLanguageForm";
import { CustomizationForm, type CustomizationFormHandle } from "./CustomizationForm";
import type { LanguageChooserViewModel } from "@ethnolib/language-chooser-controller";

interface CustomizationModalProps {
  languageChooser: LanguageChooserViewModel;
  onClose: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  languageChooser,
  onClose,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const unlistedFormRef = useRef<UnlistedLanguageFormHandle>(null);
  const customizationFormRef = useRef<CustomizationFormHandle>(null);
  const [isCreatingUnlisted, setIsCreatingUnlisted] = useState(false);

  const [customLanguageTag] = useField(languageChooser.customLanguageTag);

  const handleClose = useCallback(() => {
    modalRef.current?.close();
    onClose();
  }, [onClose]);

  useEffect(() => {
    // Set up the callback for showing unlisted language modal
    languageChooser.showUnlistedLanguageModal.value = (fields: { name?: string; region?: IRegion }) => {
      setIsCreatingUnlisted(true);
      // Use setTimeout to ensure refs are ready
      setTimeout(() => {
        unlistedFormRef.current?.populate(fields);
        modalRef.current?.showModal();
      }, 0);
    };
  }, [languageChooser.showUnlistedLanguageModal]);

  useEffect(() => {
    // Set up the callback for showing customize language modal
    languageChooser.showCustomizeLanguageModal.value = (fields: {
      script?: IScript;
      region?: IRegion;
      dialect?: string;
    }) => {
      setIsCreatingUnlisted(false);
      // Use setTimeout to ensure refs are ready
      setTimeout(() => {
        customizationFormRef.current?.populate(fields);
        modalRef.current?.showModal();
      }, 0);
    };
  }, [languageChooser.showCustomizeLanguageModal]);

  useEffect(() => {
    // Set up the callback for prompting for custom tag
    languageChooser.promptForCustomTag.value = (_default?: string) => {
      const tag = window.prompt(
        "If this user interface is not offering you a language tag that you know is valid ISO 639 code, you can enter it here:",
        _default
      );
      if (tag) {
        const isValid = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-[A-Z]{2})?(-[a-z0-9]+)*$/.test(tag);
        if (!isValid) {
          alert(`This is not in a valid IETF BCP 47 format: ${tag}`);
        } else {
          languageChooser.customLanguageTag.requestUpdate(tag);
          handleClose();
        }
      }
    };
  }, [languageChooser.promptForCustomTag, languageChooser.customLanguageTag, handleClose]);

  const handleClose2 = () => {
    modalRef.current?.close();
    onClose();
  };

  const handleOk = () => {
    if (isCreatingUnlisted) {
      unlistedFormRef.current?.onSubmitClicked();
    } else {
      customizationFormRef.current?.onSubmitClicked();
    }
  };

  const submitUnlisted = (name: string, region: IRegion) => {
    languageChooser.submitUnlistedLanguageModal({ name, region });
    handleClose2();
  };

  const submitCustomization = (
    script?: IScript,
    region?: IRegion,
    dialect?: string
  ) => {
    languageChooser.submitCustomizeLangaugeModal({ script, region, dialect });
    handleClose2();
  };

  const title = isCreatingUnlisted
    ? "Unlisted Language Tag"
    : "Custom Language Tag";

  const promptForCustomTagHandler = () => {
    languageChooser.promptForCustomTag.value?.(customLanguageTag);
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>

        {isCreatingUnlisted ? (
          <UnlistedLanguageForm ref={unlistedFormRef} submit={submitUnlisted} />
        ) : (
          <CustomizationForm
            ref={customizationFormRef}
            submit={submitCustomization}
          />
        )}

        <div className="flex mt-8">
          <div className="flex-1">
            <button
              className="btn btn-ghost"
              onClick={promptForCustomTagHandler}
            >
              Enter Custom Tag
            </button>
          </div>
          <div>
            <button className="btn btn-primary w-24 mr-1" onClick={handleOk}>
              Ok
            </button>
            <button className="btn w-24" onClick={handleClose2}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
