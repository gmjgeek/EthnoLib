import React, { useRef } from "react";
import { useField } from "@ethnolib/state-management-react";
import type { LanguageCardViewModel } from "@ethnolib/language-chooser-controller";

interface LanguageCardProps {
  viewModel: LanguageCardViewModel;
  onSelect?: (element: HTMLElement) => void;
}

export const LanguageCard: React.FC<LanguageCardProps> = ({
  viewModel,
  onSelect,
}) => {
  const [isSelected, setIsSelected] = useField(viewModel.isSelected);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const wasSelected = isSelected;
    setIsSelected(!isSelected);

    if (!wasSelected && !isSelected && onSelect && cardRef.current) {
      onSelect(cardRef.current);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`card card-border shadow-md my-2 ${
        isSelected
          ? "text-primary-content bg-primary"
          : "bg-base-100 hover:bg-base-300"
      }`}
    >
      <button className="card-body text-left" onClick={handleClick}>
        <div className="flex">
          <div className="text-lg flex-1">{viewModel.title}</div>
          <div className="flex-none mr-4">{viewModel.secondTitle}</div>
          <div className="flex-none font-mono opacity-70">
            {viewModel.language.iso639_3_code}
          </div>
        </div>
        <div>
          {viewModel.description() && (
            <p className="mt-2 text-sm opacity-80">{viewModel.description()}</p>
          )}
          <p className="mt-2 text-sm opacity-80">
            {viewModel.language.names.join(", ")}
          </p>
        </div>
      </button>
    </div>
  );
};
