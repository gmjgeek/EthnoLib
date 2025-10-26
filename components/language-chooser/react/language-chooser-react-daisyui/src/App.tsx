import React, { useState, useRef } from "react";
import "./app.css";
import {
  LanguageChooserModal,
  type LanguageChooserModalHandle,
} from "./lib/LanguageChooserModal";
import {
  defaultDisplayName,
  type IOrthography,
} from "@ethnolib/find-language";

export const App: React.FC = () => {
  const [orthography, setOrthography] = useState<IOrthography>({});
  const [languageTag, setLanguageTag] = useState<string | undefined>();
  const modalRef = useRef<LanguageChooserModalHandle>(null);

  const handleOrthographyChange = (
    newOrthography: IOrthography,
    newLanguageTag?: string
  ) => {
    setOrthography(newOrthography);
    setLanguageTag(newLanguageTag);
  };

  return (
    <main>
      <div className="m-8">
        <h1 className="text-4xl md:text-5xl mb-8">Language Chooser Demo</h1>

        <div className="flex">
          <div className="flex-1">
            <div className="card card-border w-96 bg-base-100 shadow-xl mb-8">
              <div className="card-body">
                <p>
                  Language Display Name:{" "}
                  {orthography.customDetails?.customDisplayName ||
                    defaultDisplayName(
                      orthography.language,
                      orthography.script
                    )}
                </p>
                <p>Language Code: {orthography.language?.languageSubtag}</p>
                <p>Script: {orthography.script?.name}</p>
                <p>Region: {orthography.customDetails?.region?.name}</p>
                <p>Dialect: {orthography.customDetails?.dialect}</p>
                <p>Language Tag: {languageTag}</p>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => modalRef.current?.show()}
            >
              Modify Language Selection
            </button>
          </div>
          <div className="flex-1">
            <h3>Choose Theme:</h3>
            <fieldset className="fieldset">
              <label className="flex gap-2 cursor-pointer items-center">
                <input
                  type="radio"
                  name="theme-radios"
                  className="radio radio-sm theme-controller"
                  value="light"
                  defaultChecked
                />
                Light
              </label>
              <label className="flex gap-2 cursor-pointer items-center">
                <input
                  type="radio"
                  name="theme-radios"
                  className="radio radio-sm theme-controller"
                  value="dark"
                />
                Dark
              </label>
            </fieldset>
          </div>
        </div>
      </div>

      <LanguageChooserModal
        ref={modalRef}
        onOrthographyChange={handleOrthographyChange}
      />
    </main>
  );
};
