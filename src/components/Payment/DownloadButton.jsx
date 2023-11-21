import React, { Fragment } from "react";

function DownloadButton({ isDownloading, onClick }) {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-2 ${
        isDownloading ? "cursor-not-allowed" : "hover:bg-yellow-600"
      } bg-yellow-500 text-gray-800 font-semibold rounded-full shadow-md w-48`}
      onClick={onClick}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <Fragment>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path fill="#fff" d="M4 12a8 8 0 018 8V4a8 8 0 00-8 8z" />
          </svg>
          Downloading...
        </Fragment>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Download As Pdf
        </>
      )}
    </button>
  );
}

export default DownloadButton;
