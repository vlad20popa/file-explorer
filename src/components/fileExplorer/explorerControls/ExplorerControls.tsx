import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import "./ExplorerControls.scss";
import useGlobalStatusUpdater from "@/hooks/useGlobalStatusUpdater";

type ExplorerControlsProps = {
  selected: Map<string, boolean>;
  setStatus: Dispatch<SetStateAction<Map<string, boolean>>>;
  checkFileStatus: (name: string) => boolean;
};
export default function ExplorerControls({
  selected,
  setStatus,
  checkFileStatus,
}: ExplorerControlsProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [globalStatus, setGlobalStatus] = useState(false);
  let selectedNo = 0;
  selected.forEach((value) => {
    if (value) {
      selectedNo++;
    }
  });

  const setIndeterminateStatus = (status: boolean) => {
    if (inputRef && inputRef.current) {
      inputRef.current.indeterminate = status;
      inputRef.current.checked = false;
    }
  };

  const checkAllStatusesSame = useGlobalStatusUpdater(
    selected,
    setIndeterminateStatus,
    setGlobalStatus,
  );

  const onGlobalStatusSelect = () => {
    const areStatusesSimilar = checkAllStatusesSame();
    if (areStatusesSimilar) {
      setAllStatuses(!globalStatus);
    } else {
      setAllStatuses(false);
    }
  };

  const setAllStatuses = (status: boolean) => {
    const _selectedFiles = new Map();
    selected.forEach((value, key) => {
      _selectedFiles.set(key, status);
    });
    setStatus(_selectedFiles);
  };

  const onDownload = () => {
    let files:Array<string> = [];
    let unavailableFiles:Array<string> = [];
    selected.forEach((value, key) => {
      if (value) {
        files.push(key);
        if(!checkFileStatus(key)){
            unavailableFiles.push(key);
        }
      }
    });

    if(unavailableFiles.length > 0) {
        alert("Selection contain unavailable files: " + unavailableFiles.join())
    } else if(files.length === 0){
        alert("Nothing to download");
    } else {
      alert("Download" + files.join(","));
    }
  };

  return (
    <div className="grid-controls">
      <div className="controls-container">
        <div className="checkbox">
          <input
            ref={inputRef}
            checked={globalStatus}
            onChange={onGlobalStatusSelect}
            className="general-check"
            type="checkbox"
          />
        </div>
        <div className="selected-spacing">{`${selectedNo === 0 ? "None" : ""} Selected ${selectedNo > 0 ? selectedNo : ""} `}</div>

        <button onClick={onDownload}>
          <FontAwesomeIcon className="inline items-center" width={16} icon={faDownload} /> Download Selected
        </button>
      </div>
    </div>
  );
}
