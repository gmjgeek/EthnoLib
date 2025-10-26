import { useState, useImperativeHandle, forwardRef } from "react";
import {
  getAllRegions,
  getAllScripts,
  type IScript,
  type IRegion,
} from "@ethnolib/find-language";

interface CustomizationFormProps {
  submit: (script?: IScript, region?: IRegion, name?: string) => void;
}

export interface CustomizationFormHandle {
  populate: (fields: {
    script?: IScript;
    region?: IRegion;
    dialect?: string;
  }) => void;
  onSubmitClicked: () => void;
}

export const CustomizationForm = forwardRef<
  CustomizationFormHandle,
  CustomizationFormProps
>(function CustomizationForm({ submit }, ref) {
  const [scriptCode, setScriptCode] = useState<string | undefined>(undefined);
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  const regions = getAllRegions().sort((a, b) => a.name.localeCompare(b.name));
  const scripts = getAllScripts().sort((a, b) => a.name.localeCompare(b.name));

  useImperativeHandle(ref, () => ({
    populate: (fields: {
      script?: IScript;
      region?: IRegion;
      dialect?: string;
    }) => {
      setScriptCode(fields.script?.code);
      setRegionCode(fields.region?.code);
      setName(fields.dialect);
    },
    onSubmitClicked: () => {
      const region = regions.find((r) => r.code === regionCode);
      const script = scripts.find((s) => s.code === scriptCode);
      submit(script, region, name);
    },
  }));

  return (
    <>
      <div className="card card-border border-info text-sm mb-4 p-4">
        If you found the main language but need to change some of the specifics
        like Script or Dialect, you can do that here.
      </div>

      <div className="mb-4">
        <label>
          <span className="font-semibold opacity-70">Script</span>
          <select
            className="select w-full"
            value={scriptCode || ""}
            onChange={(e) => setScriptCode(e.target.value || undefined)}
          >
            <option value=""></option>
            {scripts.map((script) => (
              <option key={script.code} value={script.code}>
                {script.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label>
          <span className="font-semibold opacity-70">Country</span>
          <select
            className="select w-full"
            value={regionCode || ""}
            onChange={(e) => setRegionCode(e.target.value || undefined)}
          >
            <option value=""></option>
            {regions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label>
          <span className="font-semibold opacity-70">Variant (dialect)</span>
          <input
            className="input w-full"
            value={name || ""}
            onChange={(e) => setName(e.target.value || undefined)}
          />
        </label>
      </div>
    </>
  );
});
