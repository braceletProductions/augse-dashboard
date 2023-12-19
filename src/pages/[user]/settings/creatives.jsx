import React, { useState } from "react";
import Rect from "@/components/Creatives/Rect";
import Square from "@/components/Creatives/Square";
import ConfirmDelete from "@/components/Creatives/ConfirmDelete";
import UploadCreativeForm from "@/components/Creatives/UploadCreativeForm";

function creatives() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);
  const [showUploadOption, setShowUploadOption] = useState(null);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleUploadClick = () => {
    setShowUploadOption(true);
  };

  const handleUploadOptionClose = () => {
    setShowUploadOption(false);
  };

  const handleUploadSubmit = () => {};

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto p-4">
        <div className="w-full flex">
          <Square onDelete={handleDeleteClick} onUpload={handleUploadClick} />
          <Rect onDelete={handleDeleteClick} onUpload={handleUploadClick} />
        </div>
        {showDeleteDialog && (
          <ConfirmDelete
            onCancel={handleCancelDelete}
            onDelete={handleConfirmDelete}
          />
        )}
        {showUploadOption && (
          <UploadCreativeForm
            onSubmit={handleUploadSubmit}
            onClose={handleUploadOptionClose}
          />
        )}
      </div>
    </div>
  );
}

export default creatives;
