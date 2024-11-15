import React, { useEffect, useState } from 'react';
import Header from './pageHeader';
import FileUpload from './FileUpload';
import FileList from './UploadList';
import Description from './Description';
import styled from 'styled-components';
import LoadingPage from './LoadingPage';
import DownloadPage from './DownloadPage';

import { fetchUploads } from '../api/midifyApi.js';



const PageContainer = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  padding: 0px 40px;
  align-items: center;
  justify-content: center;
`;


const CenteredContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   max-width: 800px; /* Control the maximum width of the centered content */
//   text-align: center;
`;


const ConvertButton = styled.button`
  padding: 12px 25px;
  background-color: var(--upload-button-bg);
  color: var(--upload-button-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font: DM Sans;
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


const UploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUploads();
        setUploadedFiles(data); // Expect `data` to be an array of uploaded files
      } catch (error) {
        console.error("Error fetching uploads:", error);
        setApiError("Failed to load uploads. Please try again.");
      }
    }
    fetchData();
  }, []);

  const handleFileDrop = (files) => {
    setUploadedFiles(files);
  };

  const handleConvert = () => {
    setIsConverting(true);
    setConversionComplete(false);

    // Simulate a conversion delay
    setTimeout(() => {
      setIsConverting(false);
      setConversionComplete(true);
    }, 3000); // 3 seconds delay for conversion
  };

  const handleDownload = () => {
    alert("Download started!");
    // Implement download logic here
  };


  return (
    <div>
      <Header />
      <PageContainer>
        {apiError && <div style={{ color: 'red' }}>{apiError}</div>}

        {/* Render LoadingPage when converting */}
        {isConverting && <LoadingPage fileName={uploadedFiles[0]?.name} />}

        {/* Render main content when not converting and conversion is incomplete */}
        {!isConverting && !conversionComplete && (
          <CenteredContent>
          <FileUpload onDrop={handleFileDrop} />
          {uploadedFiles.length > 0 ? (
            <>
              <FileList files={uploadedFiles} />
              <ConvertButton onClick={handleConvert}>Convert ➔</ConvertButton>
            </>
          ) : (
            <Description />
          )}
        </CenteredContent>
          // <CenteredContent>
          //   <FileUpload onDrop={handleFileDrop} />
          //   {uploadedFiles.length > 0 && (
          //     <>
          //       <FileList files={uploadedFiles} />
          //       <ConvertButton onClick={handleConvert}>Convert ➔</ConvertButton>
          //     </>
          //   )}
          //   {uploadedFiles.length === 0 && <Description />}
          // </CenteredContent>
        )}

        {/* Render download page when conversion is complete */}
        {conversionComplete && (
          <DownloadPage
          fileName={uploadedFiles[0]?.name.replace(/\.\w+$/, '.mid')}
          onDownload={handleDownload}
          />
        )}
      </PageContainer>
    </div>
  );
};

export default UploadPage;
