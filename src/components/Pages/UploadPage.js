import React, { useState } from "react";
import Header from "../Headers/pageHeader.js";
import FileUpload from "../common/FileUpload.js";
import UploadList from "../common/UploadList.js";
import Description from "../common/Description.js";
import styled from "styled-components";
import LoadingPage from "./LoadingPage.js";
import DownloadPage from "./DownloadPage.js";
import apiClient from "../../api/midifyApi.js";

const PageContainer = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  padding: 0px 40px;
  align-items: center;
  justify-content: center;
`;

const CenteredContent = styled.div``;

const ConvertButton = styled.button`
  padding: 12px 25px;
  background-color: var(--upload-button-bg);
  color: var(--upload-button-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background 0.3s ease;
  display: block;
  margin-left: auto;

  &:hover {
    background-color: #1a5cad;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  align-items: center; /* Align inputs and labels vertically */
  justify-content: center; /* Adjust alignment to start */
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  background-color: var(--background-color-light);
  color: var(--text-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1a5cad;
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 20px; /* Space between the two inputs */
  align-items: center; /* Align inputs and labels vertically */
  justify-content: center; /* Adjust alignment to start */
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  max-height: 300px; /* Set a max height */
  overflow-y: auto; /* Enable scrolling when necessary */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  background-color: var(--background-color-light);
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover; /* Ensure the image fits well */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


const UploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileID, setFileID] = useState(0);
  const [tempo, setTempo] = useState(120); // Default tempo to 120 BPM
  const [timeSignature, setTimeSignature] = useState("4/4"); // Default time signature to 4/4

  // // Simulate fetching uploads from "local storage"
  // useEffect(() => {
  //   // const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
  //   // setUploadedFiles(storedFiles);
  // }, []);

  // // const handleFileDrop = (files) => {
  // //   if (!files || files.length === 0) {
  // //     console.error('No files provided.');
  // //     return;
  // //   }

  const handleFileDrop = async (files) => {
    if (!files || files.length === 0) {
      console.error("No files provided.");
      return;
    }
    console.log("I can't believe I'm here");

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const token = localStorage.getItem("authToken"); // Retrieve the token
      console.log(token);
      const response = await apiClient.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // ...(token && { Authorization: Token ${token} }), // Include token only if it exists
        },
      });
      console.log("File uploaded successfully:", response.data);
      const uploadedFile = {
        ...response.data, // File data from the backend
        name: file.name,
        size: file.size,
      };
      console.log("Uploaded file data ", uploadedFile);
      setFileID(uploadedFile.id);
      setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = (files) => {
    console.log("[Upload Page] Handling file change...");
    handleFileDrop(files);
  };

  const handleConvert = async () => {
    setIsConverting(true);
    setConversionComplete(false);

    try {
      const token = localStorage.getItem("authToken"); // Retrieve the token
      const response = await apiClient.post(
        `/upload/${fileID}/convert/`,
          { tempo: tempo, timeSignature: timeSignature},
        {
          headers: {
            ...(token && { Authorization: `Token ${token}` }),
          },
        }
      );

      console.log("Conversion initiated:", response.data);
      // Optionally, poll for status or wait for a response indicating completion.
      setConversionComplete(true);
    } catch (error) {
      console.error(
        "Error during conversion:",
        error.response?.data || error.message
      );
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve the token for authentication
      const response = await apiClient.get(`/upload/${fileID}/download/`, {
        responseType: "blob", // Handle binary file data
        headers: {
          ...(token && { Authorization: `Token ${token}` }), // Include token if available
        },
      });

      // Process the downloaded file
      const blob = new Blob([response.data], { type: "audio/midi" });
      console.log(blob);
      setMidiFileBlob(blob); // Store the blob for use in the audio player


      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `converted_file_${fileID}.mid`; // Provide a filename for the download
      link.click(); // Trigger the download
    } catch (error) {
      // Handle errors
      console.error(
        "Error during file download:",
        error.response?.data || error.message
      );
      alert("Failed to download the file. Please try again.");
    }
  };


  return (
    <div>
      <Header />
      <PageContainer>
        {isConverting && <LoadingPage fileName={uploadedFiles[0]?.name} />}
        {!isConverting && !conversionComplete && (
          <CenteredContent>
            <FileUpload onDrop={onFileChange} />
            {isUploading && <p>Uploading file, please wait...</p>}
            {uploadedFiles.length > 0 ? (
                <>
                  <HorizontalContainer>
                    <InputContainer>
                      <Label htmlFor="tempo">Tempo (BPM)</Label>
                      <Input
                        type="number"
                        id="tempo"
                        value={tempo}
                        onChange={(e) => setTempo(e.target.value)}
                        placeholder="e.g., 120"
                        min="40"
                        max="240"
                      />
                    </InputContainer>
                    <InputContainer>
                      <Label htmlFor="timeSignature">Time Signature</Label>
                      <Input
                        type="text"
                        id="timeSignature"
                        value={timeSignature}
                        onChange={(e) => setTimeSignature(e.target.value)}
                        placeholder="e.g., 4/4"
                      />
                    </InputContainer>
                  </HorizontalContainer>
                  <UploadList files={uploadedFiles}/>
                  <ConvertButton onClick={handleConvert}>Convert ➔</ConvertButton>
                </>
            ) : (
                <Description/>
            )}
          </CenteredContent>
        )}
        {conversionComplete && (
            <DownloadPage
                fileID={fileID} // Pass fileID to DownloadPage
                fileName={uploadedFiles[0]?.name.replace(/\.\w+$/, ".mid")}
                onDownload={handleDownload}
            />
        )}
      </PageContainer>
    </div>
  );
};

export default UploadPage;