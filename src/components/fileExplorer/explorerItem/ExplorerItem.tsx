import React, { MouseEventHandler } from "react";
import { ExplorerFile, Status } from "@/model/ExplorerFile";
import "./ExplorerItem.scss";

type ExplorerItemProps = {
  file: ExplorerFile;
  isSelected: boolean;
  onSelect: (index: string) => void;
};
export default function ExplorerItem({
  file,
  onSelect,
  isSelected,
}: ExplorerItemProps) {
  const onItemSelect = () => {
    onSelect(file.name);
  };

  const capitalizeFirstLetter = (text: string) => {
    return text[0].toUpperCase() + text.slice(1);
  };

  return (
    <div
      onClick={onItemSelect}
      className={`grid-row item ${isSelected && "selected"}`}
    >
      <div>
        <input
          className="general-check"
          type="checkbox"
          onChange={() => {}}
          checked={isSelected}
        />
      </div>
      <div>{file.name}</div>
      <div>{file.device}</div>
      <div>{file.path}</div>
      <div className={file.status === Status.AVAILABLE ? "circle" : ""} />
      <div>{capitalizeFirstLetter(file.status)}</div>
    </div>
  );
}
