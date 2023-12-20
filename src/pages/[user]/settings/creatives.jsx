import React, { useEffect, useState } from "react";
import Rect from "@/components/Creatives/Rect";
import Square from "@/components/Creatives/Square";
import ConfirmDelete from "@/components/Creatives/ConfirmDelete";
import UploadCreativeForm from "@/components/Creatives/UploadCreativeForm";
import axios from "axios";

function creatives() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showUploadOption, setShowUploadOption] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [creativesMain, setCreativesMain] = useState([]);
  const [creatives1, setCreatives1] = useState([]);
  const [creatives2, setCreatives2] = useState([]);

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  const handleDeleteClick = (id) => {
    setShowDeleteDialog(id);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(
        process.env.NEXT_PUBLIC_SERVER_URL + "/creative/" + showDeleteDialog
      );
    } catch (error) {
      console.log(error);
    }
    setShowDeleteDialog(null);
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(null);
  };

  const handleUploadClick = (type) => {
    setShowUploadOption(type);
  };

  const handleUploadOptionClose = () => {
    setShowUploadOption(null);
  };

  const handleUploadSubmit = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("type", showUploadOption);
      formData.append("creative", file);
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/creative",
        formData
      );
      setShowUploadOption(false);
    } catch (error) {
      console.log(error);
    }
    setIsUploading(false);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (isDeleting || isUploading) return;
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/creative/Main",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setCreativesMain(response.data.creatives);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/creative/Creative1",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setCreatives1(response.data.creatives);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/creative/Creative2",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setCreatives2(response.data.creatives);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [isDeleting, isUploading]);

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto p-4">
        <div className="w-full flex">
          <Square
            onDelete={handleDeleteClick}
            onUpload={handleUploadClick}
            creatives={creativesMain}
          />
          <Rect
            onDelete={handleDeleteClick}
            onUpload={handleUploadClick}
            creatives1={creatives1}
            creatives2={creatives2}
          />
        </div>
        {showDeleteDialog && (
          <ConfirmDelete
            onCancel={handleCancelDelete}
            onDelete={handleConfirmDelete}
            loading={isDeleting}
            path={showDeleteDialog}
          />
        )}
        {showUploadOption && (
          <UploadCreativeForm
            onSubmit={handleUploadSubmit}
            onClose={handleUploadOptionClose}
            loading={isUploading}
          />
        )}
      </div>
    </div>
  );
}

export default creatives;
