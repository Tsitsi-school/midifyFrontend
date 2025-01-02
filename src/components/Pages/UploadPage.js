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


  const handleConvert = () => {
    setIsConverting(true);
    setConversionComplete(false);
    setConversionProgress(0);

    const interval = setInterval(() => {
      setConversionProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setConversionComplete(true);
          return 100;
        }
        return prevProgress + 10; // Increment progress by 10%
      });
    }, 500); // Update progress every 500ms
  };

  const handleDownload = () => {
    alert('Download started!');
    // Implement a mock download (e.g., create a dummy file and download it)
    const fileName = uploadedFiles[0]?.name.replace(/\.\w+$/, '.mid');
    const blob = new Blob(['MIDI content'], { type: 'audio/midi' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName || 'file.mid';
    link.click();
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
            fileName={uploadedFiles[0]?.name.replace(/\.\w+$/, '.mid')}
            onDownload={handleDownload}
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