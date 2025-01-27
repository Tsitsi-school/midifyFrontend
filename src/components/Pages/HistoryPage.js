import React, { useEffect, useState } from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Header from "../Headers/pageHeader";
import { fetchImage, fetchMIDI, fetchUploadHistory } from "../../api/midifyApi";
import { format } from "date-fns";
import Layout from "../common/Layout";
import "../pageStyles.css";

const HistoryPage = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await fetchUploadHistory(); // Fetch history from API
        setHistoryItems(data);
      } catch (error) {
        setError("Failed to fetch upload history.");
        console.error("Error fetching upload history:", error);
      }
    };
    fetchHistory();
  }, []);

  const handleMIDIDownload = async (uploadId) => {
    try {
      const blob = await fetchMIDI(uploadId);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob); // Create a URL from the blob
      link.download = `midi_${uploadId}.mid`;

      console.log(`MIDI file with ID ${uploadId} downloaded successfully.`);
    } catch (error) {
      console.error(
        `Error downloading midi with ID ${uploadId}:`,
        error.message
      );
      alert("Failed to download the midi. Please try again.");
    }
  };

  const handleImageDownload = async (uploadId) => {
    try {
      const blob = await fetchImage(uploadId);
      // Trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `image_${uploadId}.png`;
      link.click();

      console.log(`Image with ID ${uploadId} downloaded successfully.`);
    } catch (error) {
      console.error(
        `Error downloading image with ID ${uploadId}:`,
        error.message
      );
      alert("Failed to download the image. Please try again.");
    }
  };

  const formatFileName = (name) => {
    return name.startsWith("upload/") ? name.replace("upload/", "") : name;
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), "MMMM dd, yyyy hh:mm a");
    } catch (error) {
      console.error("Invalid date format:", date);
      return "Invalid Date";
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!historyItems.length) {
    return (
      <Layout header={Header}>
        <div className="history-page-container no-history-container">
          <div className="no-history-content">
            <InsertDriveFileOutlinedIcon className="no-history-icon" />
            <h2>No Upload History Found</h2>
            <p>
              You haven’t uploaded any files yet. Start by uploading a file to
              see your history here.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout header={Header}>
      <div className="history-page-container">
        <h1 className="history-title">History</h1>
        <div className="history-list">
          {historyItems
            .slice()
            .reverse()
            .map((item) => (
              <div className="history-item" key={item.id}>
                <div className="history-file-info">
                  <InsertDriveFileOutlinedIcon />
                  <span className="history-file-name">
                    {formatFileName(item.name) || "Unnamed File"}
                  </span>
                  <span className="history-file-date">
                    {formatDate(item.date) || "Unknown Date"}
                  </span>
                  <button
                    className="history-download-button"
                    onClick={() => handleMIDIDownload(item.id)}
                  >
                    Download MIDI
                    <FileDownloadOutlinedIcon />
                  </button>
                  <button
                    className="history-download-button"
                    onClick={() => handleImageDownload(item.id)}
                  >
                    Download Image
                    <FileDownloadOutlinedIcon />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;
