"use client";

import "./FileExplorer.scss";
import React, { useState } from "react";
import ExplorerControls from "@/components/fileExplorer/explorerControls/ExplorerControls";
import ExplorerItem from "@/components/fileExplorer/explorerItem/ExplorerItem";
import { ExplorerFile, Status } from "@/model/ExplorerFile";
import ExplorerHeader from "@/components/fileExplorer/header/ExplorerHeader";

type FileExploreProps = {
  files: ExplorerFile[];
};

export default function FileExplorer({ files }: FileExploreProps) {
  const initialSelected = new Map<string, boolean>();
  files.forEach((file) => {
    initialSelected.set(file.name, false);
  });
  const [selectedFiles, setSelectedFiles] =
    useState<Map<string, boolean>>(initialSelected);

  const onSelect = (name: string) => {
    const _selectedFiles = new Map(selectedFiles);
    const currentStatus = _selectedFiles.get(name);
    _selectedFiles.set(name, !currentStatus);
    setSelectedFiles(_selectedFiles);
  };

  const checkFileStatus = (fileName: string) => {
    const file = files.findLast((file) => (file.name === fileName));
    return file?.status === Status.AVAILABLE;
  };

  return (
    <div className="grid-container">
      <ExplorerControls
        selected={selectedFiles}
        setStatus={setSelectedFiles}
        checkFileStatus={checkFileStatus}
      />
      <ExplorerHeader />
      {files.map((file) => (
        <ExplorerItem
          key={file.name}
          file={file}
          onSelect={onSelect}
          isSelected={selectedFiles.get(file.name) || false}
        />
      ))}
    </div>
  );
}
