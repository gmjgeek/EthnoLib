import { useState, useImperativeHandle, forwardRef } from "react";
import { getAllRegions, type IRegion } from "@ethnolib/find-language";

interface UnlistedLanguageFormProps {
  submit: (name: string, region: IRegion) => void;
}

export interface UnlistedLanguageFormHandle {
  populate: (fields: { name?: string; region?: IRegion }) => void;
  onSubmitClicked: () => void;
}

export const UnlistedLanguageForm = forwardRef<
  UnlistedLanguageFormHandle,
  UnlistedLanguageFormProps
>(function UnlistedLanguageForm({ submit }, ref) {
  const [name, setName] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const regions = getAllRegions().sort((a, b) => a.name.localeCompare(b.name));

  useImperativeHandle(ref, () => ({
    populate: (fields: { name?: string; region?: IRegion }) => {
      setName(fields.name ?? "");
      setRegionCode(fields.region?.code ?? "");
      setShowErrors(false);
    },
    onSubmitClicked: () => {
      setShowErrors(true);
      const region = regions.find((r) => r.code === regionCode);
      if (name && region) {
        submit(name, region);
      }
    },
  }));

  const isNameInvalid = showErrors && !name;
  const isRegionInvalid = showErrors && !regionCode;

  return (
    <>
      <div className="card card-border border-info text-sm mb-4 p-4">
        If you cannot find a language and it does not appear in ethnologue.com,
        you can instead define the language here.
      </div>

      <div className="mb-4">
        <label>
          <span className="font-semibold opacity-70">Name</span>
          <input
            className={`input w-full ${isNameInvalid ? "input-error" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {isNameInvalid && <p className="text-sm text-error">Required</p>}
        </label>
      </div>

      <div className="mb-4">
        <label>
          <span className="font-semibold opacity-70">Country</span>
          <select
            className={`select w-full ${isRegionInvalid ? "select-error" : ""}`}
            value={regionCode}
            onChange={(e) => setRegionCode(e.target.value)}
          >
            <option disabled value="">
              Select a country
            </option>
            {regions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name}
              </option>
            ))}
          </select>
          {isRegionInvalid && <p className="text-sm text-error">Required</p>}
        </label>
      </div>
    </>
  );
});
