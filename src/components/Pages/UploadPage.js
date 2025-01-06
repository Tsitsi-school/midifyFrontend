import React, { useEffect, useState } from 'react';
import Header from '../Headers/pageHeader.js';
import FileUpload from '../common/FileUpload.js';
import UploadList from '../common/UploadList.js';
import Description from '../common/Description.js';
import LoadingPage from './LoadingPage.js';
import DownloadPage from './DownloadPage.js';
import uploadFile from '../../api/midifyApi.js';
import apiClient from '../../api/midifyApi.js';
import '../pageStyles.css';
import Layout from '../common/Layout.js';

const UploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0); // Track conversion progress
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); // State for image preview URL
  const [fileID, setFileID] = useState(0);
  const [midiFileBlob, setMidiFileBlob] = useState(null); // Add this state


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
      console.error('No files provided.');
      return;
    }
  
    const file = files[0];
    setPreviewUrl(URL.createObjectURL(file)); // Set the preview URL for the uploaded image

    const formData = new FormData();
    formData.append('file', file);
  
    try {
      setIsUploading(true);
      const token = localStorage.getItem('authToken'); // Retrieve the token
      console.log(token);
      const response = await apiClient.post('/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // ...(token && { Authorization: `Token ${token}` }), // Include token only if it exists
        },
      });
      const uploadedFile = {
        ...response.data, // File data from the backend
        name: file.name,
        size: file.size,  // Size in bytes from the file object
      };
      setFileID(uploadedFile.id);
      setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
    } finally {
      setIsUploading(false);
    }
  };
  
  const onFileChange = (files) => {
    console.log("[Upload Page] Handling file change...");
    handleFileDrop(files);
  };


  // const handleConvert = () => {
  //   setIsConverting(true);
  //   setConversionComplete(false);
  //   setConversionProgress(0);

  //   const interval = setInterval(() => {
  //     setConversionProgress((prevProgress) => {
  //       if (prevProgress >= 100) {
  //         clearInterval(interval);
  //         setIsConverting(false);
  //         setConversionComplete(true);
  //         return 100;
  //       }
  //       return prevProgress + 10; // Increment progress by 10%
  //     });
  //   }, 500); // Update progress every 500ms
  // };

  // const handleConvert = async () => {
  //   setIsConverting(true);
  //   setConversionComplete(false);

  //   try {
  //     const token = localStorage.getItem("authToken"); // Retrieve the token
  //     const response = await apiClient.post(
  //       `/upload/${fileID}/convert/`,
  //       null,
  //       {
  //         headers: {
  //           ...(token && { Authorization: `Token ${token}` }),
  //         },
  //       }
  //     );

  //     console.log("Conversion initiated:", response.data);
  //     // Optionally, poll for status or wait for a response indicating completion.
  //     setConversionComplete(true);
  //   } catch (error) {
  //     console.error(
  //       "Error during conversion:",
  //       error.response?.data || error.message
  //     );
  //   } finally {
  //     setIsConverting(false);
  //   }
  // };

  const handleConvert = async () => {
    setIsConverting(true);
    setConversionComplete(false);
    setConversionProgress(0);
  
    try {
      const token = localStorage.getItem("authToken"); // Retrieve the token
  
      // Send the initial request to start the conversion
      const response = await apiClient.post(`/upload/${fileID}/convert/`, null, {
        headers: {
          ...(token && { Authorization: `Token ${token}` }),
        },
      });
  
      console.log("Conversion initiated:", response.data);
  
      // Polling to check conversion progress
      const interval = setInterval(async () => {
        try {
          const statusResponse = await apiClient.get(`/upload/${fileID}/status/`, {
            headers: {
              ...(token && { Authorization: `Token ${token}` }),
            },
          });
  
          const { status, progress } = statusResponse.data; // Backend returns status and progress
  
          // Update conversion progress
          setConversionProgress(progress);
  
          if (status === "completed") {
            clearInterval(interval);
            console.log("Conversion completed successfully");
            setIsConverting(false);
            setConversionComplete(true);
          } else if (status === "failed") {
            clearInterval(interval);
            console.error("Conversion failed");
            setIsConverting(false);
            setConversionComplete(false);
            alert("Conversion failed. Please try again.");
          }
        } catch (error) {
          clearInterval(interval);
          console.error("Error fetching conversion status:", error.message);
          alert("An error occurred while checking conversion status.");
        }
      }, 1000); // Poll every 1 second for progress updates
    } catch (error) {
      console.error("Error during conversion:", error.response?.data || error.message);
      alert("Failed to initiate conversion. Please try again.");
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
      const blob = new Blob([response.data], { type: "audio/mid" });
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
    <Layout header={Header}>
      <div className="upload-page-container">
        {isConverting && <LoadingPage fileName={uploadedFiles[0]?.name} progress={conversionProgress} />}
        {!isConverting && !conversionComplete && (
          <div className="upload-centered-content">
            {previewUrl ? (
              <div className="image-preview-container">
                <img
                  src={previewUrl}
                  alt="Uploaded Preview"
                  className="image-preview"
                />
                {isUploading && <p>Uploading file, please wait...</p>}
                {uploadedFiles.length > 0 && <UploadList files={uploadedFiles} />}
                <button
                  className="upload-convert-button"
                  onClick={handleConvert}
                >
                  Convert ➔
                </button>
              </div>
            ) : (
              <>
                <FileUpload onDrop={onFileChange} />
                <Description /> {/* Show the description if no file is uploaded */}
              </>
            )}
            
          </div>
        )}

        {conversionComplete && (
          <DownloadPage
            fileName={uploadedFiles[0]?.name.replace(/\.\w+$/, ".mid")}
            onDownload={handleDownload}
            midiFileBlob={midiFileBlob}
          />
        )}
      </div>
    </Layout>
  );

  // return (
  //   <div>
  //     <Header />
  //     <div className="upload-page-container">
  //       {isConverting && <LoadingPage fileName={uploadedFiles[0]?.name} />}
  //       {!isConverting && !conversionComplete && (
  //         <div className="upload-centered-content">
  //           <FileUpload onDrop={onFileChange} />
  //           {isUploading && <p>Uploading file, please wait...</p>}
  //           {uploadedFiles.length > 0 ? (
  //             <>
  //               <UploadList files={uploadedFiles} />
  //               <button className="upload-convert-button" onClick={handleConvert}>
  //                 Convert ➔
  //               </button>
  //             </>
  //           ) : (
  //             <Description />
  //           )}
  //         </div>
  //       )}
  //       {conversionComplete && (
  //         <DownloadPage
  //           fileName={uploadedFiles[0]?.name.replace(/\.\w+$/, '.mid')}
  //           onDownload={handleDownload}
  //         />
  //       )}
  //     </div>
  //   </div>
  // );
};

export default UploadPage;