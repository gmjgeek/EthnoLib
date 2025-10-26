import React from "react";
import { useField } from "@ethnolib/state-management-react";
import { scriptSamples } from "@ethnolib/find-language";
import type { ScriptCardViewModel } from "@ethnolib/language-chooser-controller";

interface ScriptCardProps {
  viewModel: ScriptCardViewModel;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({ viewModel }) => {
  const [isSelected, setIsSelected] = useField(viewModel.isSelected);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`card card-xs shadow-md ${
        isSelected
          ? "text-secondary-content bg-secondary"
          : "bg-base-100 hover:bg-base-300"
      }`}
    >
      <button className="card-body text-left" onClick={handleClick}>
        <p className="card-title">{viewModel.script.name}</p>
        <p>{scriptSamples[viewModel.script.code.toLowerCase()] || ""}</p>
      </button>
    </div>
  );
};
