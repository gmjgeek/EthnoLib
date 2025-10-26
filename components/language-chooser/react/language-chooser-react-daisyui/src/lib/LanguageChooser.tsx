import React, { useRef } from "react";
import {
  createTagFromOrthography,
  type IOrthography,
} from "@ethnolib/find-language";
import { useField } from "@ethnolib/state-management-react";
import { useLanguageChooserViewModel, type LanguageCardViewModel, type ScriptCardViewModel } from "@ethnolib/language-chooser-controller";
import { LanguageCard } from "./LanguageCard";
import { ScriptCard } from "./ScriptCard";
import { SearchIcon } from "./SearchIcon";
import { CustomizationModal } from "./CustomizationModal";

interface LanguageListItemProps {
  lang: LanguageCardViewModel;
  listedScripts: ScriptCardViewModel[];
  onLanguageSelected: (element: HTMLElement) => void;
}

const LanguageListItem: React.FC<LanguageListItemProps> = ({
  lang,
  listedScripts,
  onLanguageSelected,
}) => {
  const [isSelected] = useField(lang.isSelected);

  return (
    <>
      <LanguageCard viewModel={lang} onSelect={onLanguageSelected} />
      {isSelected && listedScripts.length > 0 && (
        <div className="ml-8 mb-4">
          <div className="py-2">
            <p className="font-semibold text-sm">Select a script:</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {listedScripts.map((script, scriptIndex) => (
              <ScriptCard key={scriptIndex} viewModel={script} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

interface LanguageChooserProps {
  onDismiss: () => void;
  onOk: (orthography: IOrthography, languageTag?: string) => void;
}

export const LanguageChooser: React.FC<LanguageChooserProps> = ({
  onDismiss,
  onOk,
}) => {
  const viewModel = useLanguageChooserViewModel();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [searchString, setSearchString] = useField(viewModel.searchString);
  const [displayName, setDisplayName] = useField(viewModel.displayName);
  const [listedLanguages] = useField(viewModel.listedLanguages);
  const [listedScripts] = useField(viewModel.listedScripts);
  const [selectedLanguage] = useField(viewModel.selectedLanguage);
  const [selectedScript] = useField(viewModel.selectedScript);
  const [customizations] = useField(viewModel.customizations);
  const [customLanguageTag] = useField(viewModel.customLanguageTag);
  const [tagPreview] = useField(viewModel.tagPreview);
  const [isReadyToSubmit] = useField(viewModel.isReadyToSubmit);

  const orthography: IOrthography = {
    language: selectedLanguage,
    script: selectedScript,
    customDetails: customizations,
  };

  const languageTag = createTagFromOrthography(orthography);

  const scrollToSelectedCard = (cardElement: HTMLElement) => {
    if (!scrollContainerRef.current || !cardElement) return;

    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    const cardRect = cardElement.getBoundingClientRect();

    const scrollTop =
      scrollContainerRef.current.scrollTop + (cardRect.top - containerRect.top);

    scrollContainerRef.current.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });
  };

  const onLanguageSelected = (cardElement: HTMLElement) => {
    // Allow scripts to appear or disappear before scrolling
    setTimeout(() => scrollToSelectedCard(cardElement), 0);
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-3xl p-4 border-b-2 border-base-300 flex-none">
        Choose Language
      </h3>

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 flex flex-col min-h-0 bg-base-200 p-4">
          <div className="flex-none pb-1">
            <label className="input w-full">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search by name, code, or country"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
            </label>
          </div>

          <div
            className="flex-1 overflow-y-auto min-h-0"
            ref={scrollContainerRef}
          >
            {listedLanguages.slice(0, 100).map((lang, index) => (
              <LanguageListItem
                key={index}
                lang={lang}
                listedScripts={listedScripts}
                onLanguageSelected={onLanguageSelected}
              />
            ))}
          </div>

          <div className="flex-none py-2">
            <div className="card card-xs card-border border-base-300 bg-base-100 hover:bg-base-300 shadow-xl w-48 px-2">
              <button
                className="card-body text-left"
                onClick={() => viewModel.onCustomizeButtonClicked()}
              >
                <p className="card-title uppercase">
                  {customLanguageTag
                    ? "Edit Language Tag"
                    : selectedLanguage
                    ? "Customize"
                    : "Unlisted Language"}
                </p>
                <div className="flex">
                  <p className="flex-1 font-mono text-sm opacity-60">
                    {tagPreview}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-6">
          <div className="flex-1"></div>
          <div className="flex-none">
            {selectedLanguage && (
              <>
                <label>
                  <span className="font-semibold opacity-70">
                    Display this language this way
                  </span>
                  <input
                    className="input input-xl w-full"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </label>
                <div className="font-mono opacity-70 p-2">
                  <p>{tagPreview}</p>
                </div>
              </>
            )}
            <div className="flex justify-end">
              <button
                className="btn btn-primary uppercase w-24 mx-1"
                disabled={!isReadyToSubmit}
                onClick={() => onOk(orthography, languageTag)}
              >
                Ok
              </button>
              <button className="btn uppercase w-24 mx-1" onClick={onDismiss}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <CustomizationModal
        languageChooser={viewModel}
        onClose={() => {
          /* No action needed on close */
        }}
      />
    </div>
  );
};
