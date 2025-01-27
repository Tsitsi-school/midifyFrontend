import React, { useState } from "react";
import Header from "../Headers/pageHeader.js";
import FileUpload from "../common/FileUpload.js";
import Description from "../common/Description.js";
import LoadingPage from "./LoadingPage.js";
import DownloadPage from "./DownloadPage.js";
import apiClient from "../../api/midifyApi.js";
import "../pageStyles.css";
import Layout from "../common/Layout.js";

const UploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [tempo, setTempo] = useState(120);
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileDrop = async (files) => {
    if (!files || files.length === 0) return;

    try {
      const uploadedFiles = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await apiClient.post("/upload/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Uploaded file response:", response.data);
        uploadedFiles.push(response.data);

        const uploadedFile = {
          ...response.data,
          name: file.name,
          size: file.size,
        };
        console.log("Uploaded file data ", uploadedFile);
        setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);

        // Generate preview of the file
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrls((prevUrl) => [...(prevUrl || []), previewUrl]);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert(
        `Error uploading files: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) {
      alert("No files to convert");
      return;
    }
    setIsConverting(true);
    setConversionComplete(false);
    setConversionProgress(0);

    try {
      const token = localStorage.getItem("authToken"); // Retrieve the token

      let loadProgress = 0;

      const loadingInterval = setInterval(() => {
        if (loadProgress < 95) {
          const increment = Math.floor(Math.random() * 7) + 1;
          loadProgress = Math.min(loadProgress + increment, 95);
          setConversionProgress(Math.round(loadProgress));
        }
      }, 500);
      console.log("Conversion initiated.");

      const fileIds = uploadedFiles.map((file) => file.id);
      console.log("file id", uploadedFiles[0].id);
      console.log("file id", uploadedFiles[0].name);
      const response = await apiClient.post("/upload/batch_convert/", {
        file_ids: fileIds,
        tempo,
        timeSignature,
      });

      //Updating loading bar
      const statusCheckInterval = setInterval(async () => {
        try {
          const statusResponse = await apiClient.get(
            `/upload/${uploadedFiles[0].id}/status/`,
            {
              headers: {
                ...(token && { Authorization: `Token ${token}` }),
              },
            }
          );

          const { status } = statusResponse.data;

          if (status === "completed") {
            clearInterval(loadingInterval);
            clearInterval(statusCheckInterval);
            console.log("Batch conversion completed:", response.data);
            let finalProgress = loadProgress;
            const smoothCompletionInterval = setInterval(() => {
              finalProgress += 5;
              setConversionProgress(finalProgress);
              if (finalProgress >= 100) {
                clearInterval(smoothCompletionInterval);
                setIsConverting(false);
                setConversionComplete(true);
              }
            }, 100);
          } else if (status === "failed") {
            clearInterval(loadingInterval);
            clearInterval(statusCheckInterval);
            console.error("Conversion failed");
            setIsConverting(false);
            setConversionComplete(false);
            alert("Conversion failed. Please try again.");
          }
        } catch (error) {
          clearInterval(loadingInterval);
          clearInterval(statusCheckInterval);
          console.error("Error fetching conversion status:", error.message);
          alert("An error occurred while checking conversion status.");
        }
      }, 2000);
    } catch (error) {
      console.error(
        "Error during conversion:",
        error.response?.data || error.message
      );
      alert("Failed to initiate conversion. Please try again.");
      setIsConverting(false);
    }
  };

  const handleDownload = async () => {
    try {
      // Retrieve the token for authentication
      const token = localStorage.getItem("authToken");
      const response = await apiClient.get(
        `/upload/${uploadedFiles[0].id}/download/`,
        {
          responseType: "blob",
          headers: {
            ...(token && { Authorization: `Token ${token}` }),
          },
        }
      );

      // Process downloading of the file
      const blob = new Blob([response.data], { type: "audio/midi" });
      console.log(blob);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${uploadedFiles[0]?.name.replace(
        /\.\w+$/,
        ""
      )}_converted.mid`;
      link.click();
    } catch (error) {
      console.error(
        "Error during file download:",
        error.response?.data || error.message
      );
      alert("Failed to download the file. Please try again.");
    }
  };

  return (
    <Layout header={Header}>
      <div className="upload-page-container">
        {isConverting && (
          <LoadingPage
            fileName={uploadedFiles[0]?.name}
            progress={conversionProgress}
          />
        )}
        {!isConverting && !conversionComplete && (
          <div className="upload-centered-content">
            <h1 className="download-title" style={{ marginBottom: "20px" }}>
              Sheet Music to MIDI Converter
            </h1>
            {previewUrls && previewUrls.length > 0 ? (
              <>
                <div className="image-preview-container">
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Uploaded Preview ${index + 1}`}
                      className="image-preview"
                    />
                  ))}
                </div>
                <div className="horizontal-container">
                  <div className="input-metrics-container">
                    <label className="label-metrics" htmlFor="tempo">
                      Tempo (BPM)
                    </label>
                    <input
                      className="input-metrics"
                      type="number"
                      id="tempo"
                      value={tempo}
                      onChange={(e) => setTempo(e.target.value)}
                      placeholder="e.g., 120"
                      min="40"
                      max="240"
                    />
                  </div>
                  <div className="input-metrics-container">
                    <label className="label-metrics" htmlFor="timeSignature">
                      Time Signature
                    </label>
                    <input
                      className="input-metrics"
                      type="text"
                      id="timeSignature"
                      value={timeSignature}
                      onChange={(e) => setTimeSignature(e.target.value)}
                      placeholder="e.g., 4/4"
                    />
                  </div>
                </div>
              </>
            ) : null}
            <FileUpload onDrop={handleFileDrop} />
            {previewUrls && previewUrls.length > 0 ? (
              <button className="upload-convert-button" onClick={handleConvert}>
                Convert ➔
              </button>
            ) : (
              <Description />
            )}
          </div>
        )}
        {conversionComplete && (
          <DownloadPage
            fileID={uploadedFiles[0].id}
            fileName={uploadedFiles[0]?.name.replace(/\.\w+$/, ".mid")}
            files={uploadedFiles}
            onDownload={handleDownload}
          />
        )}
      </div>
    </Layout>
  );
};

export default UploadPage;
