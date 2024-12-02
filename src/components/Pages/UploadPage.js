import React, { useEffect, useState } from 'react';
import Header from '../Headers/pageHeader.js';
import FileUpload from '../common/FileUpload.js';
import UploadList from '../common/UploadList.js';
import Description from '../common/Description.js';
import styled from 'styled-components';
import LoadingPage from './LoadingPage.js';
import DownloadPage from './DownloadPage.js';
import uploadFile from '../../api/midifyApi.js';
import apiClient from '../../api/midifyApi.js';
 

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
  const [isUploading, setIsUploading] = useState(false);

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
    console.log("I can't believe I'm here");
  
    const file = files[0];
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
      console.log('File uploaded successfully:', response.data);
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

    // Simulate a conversion delay
    setTimeout(() => {
      setIsConverting(false);
      setConversionComplete(true);
    }, 3000); // 3 seconds delay
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
                <UploadList files={uploadedFiles} />
                <ConvertButton onClick={handleConvert}>Convert ➔</ConvertButton>
              </>
            ) : (
              <Description />
            )}
          </CenteredContent>
        )}
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



// import React, { useEffect, useState } from 'react';
// import Header from '../Headers/pageHeader.js';
// import FileUpload from '../common/FileUpload.js';
// import UploadList from '../common/UploadList.js';
// import Description from '../common/Description.js';
// import styled from 'styled-components';
// import LoadingPage from './LoadingPage.js';
// import DownloadPage from './DownloadPage.js';

// // import { fetchUploads, uploadFile } from '../../api/midifyApi.js';



// const PageContainer = styled.div`
//   background-color: var(--background-color);
//   color: var(--text-color);
//   min-height: 100vh;
//   padding: 0px 40px;
//   align-items: center;
//   justify-content: center;
// `;


// const CenteredContent = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// //   width: 100%;
// //   max-width: 800px; /* Control the maximum width of the centered content */
// //   text-align: center;
// `;


// const ConvertButton = styled.button`
//   padding: 12px 25px;
//   background-color: var(--upload-button-bg);
//   color: var(--upload-button-text);
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 1rem;
//   font: DM Sans;
//   margin-top: 20px;
//   transition: background 0.3s ease;
//   display: block;
//   margin-left: auto;

//   &:hover {
//     background-color: #1a5cad;
//   }

//   &:disabled {
//     background-color: #ccc;
//     cursor: not-allowed;
//   }

// `;


// const UploadPage = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [isConverting, setIsConverting] = useState(false);
//   const [conversionComplete, setConversionComplete] = useState(false);
//   const [apiError, setApiError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await fetchUploads();
//         setUploadedFiles(data); // Expect `data` to be an array of uploaded files
//       } catch (error) {
//         console.error("Error fetching uploads:", error);
//         setApiError("Failed to load uploads. Please try again.");
//       }
//     }
//     fetchData();
//   }, []);

//   const handleFileDrop = async (files) => {
//     try {
//       if (!files || files.length === 0) {
//         console.error('No files provided.');
//         return;
//       }
  
//       let file = files[0]; // Get the first file
  
//       // Check if the object is a valid File instance
//       if (!(file instanceof File)) {
//         console.warn('Converting to a valid File object...');
//         file = new File([file], file.name, { type: file.type });
//       }
  
//       console.log('File object after conversion:', file);
//       console.log('Is instance of File:', file instanceof File); // Should now return true
  
//       const response = await uploadFile(file); // Call API function to upload the file
//       console.log('File uploaded successfully:', response);
  
//       // Update the state with the uploaded file data from the backend
//       setUploadedFiles((prevFiles) => [...prevFiles, response]);
//     } catch (error) {
//       console.error('File upload failed:', error);
//     }
//   };
  
  
  
//   const handleConvert = () => {
//     setIsConverting(true);
//     setConversionComplete(false);

//     // Simulate a conversion delay
//     setTimeout(() => {
//       setIsConverting(false);
//       setConversionComplete(true);
//     }, 3000); // 3 seconds delay for conversion
//   };

//   const handleDownload = () => {
//     alert("Download started!");
//     // Implement download logic here
//   };


//   return (
//     <div>
//       <Header />
//       <PageContainer>
//         {apiError && <div style={{ color: 'red' }}>{apiError}</div>}

//         {/* Render LoadingPage when converting */}
//         {isConverting && <LoadingPage fileName={uploadedFiles[0]?.name} />}

//         {/* Render main content when not converting and conversion is incomplete */}
//         {!isConverting && !conversionComplete && (
//           <CenteredContent>
//           <FileUpload onDrop={handleFileDrop} />
//           {uploadedFiles.length > 0 ? (
//             <>
//               {/* <FileList files={uploadedFiles} /> */}
//               {/* <UploadList files={uploadedFiles} setUploadedFiles={setUploadedFiles} /> */}
//               <UploadList files={uploadedFiles} />
//               <ConvertButton onClick={handleConvert}>Convert ➔</ConvertButton>
//             </>
//           ) : (
//             <Description />
//           )}
//         </CenteredContent>
//           // <CenteredContent>
//           //   <FileUpload onDrop={handleFileDrop} />
//           //   {uploadedFiles.length > 0 && (
//           //     <>
//           //       <FileList files={uploadedFiles} />
//           //       <ConvertButton onClick={handleConvert}>Convert ➔</ConvertButton>
//           //     </>
//           //   )}
//           //   {uploadedFiles.length === 0 && <Description />}
//           // </CenteredContent>
//         )}

//         {/* Render download page when conversion is complete */}
//         {conversionComplete && (
//           <DownloadPage
//           fileName={uploadedFiles[0]?.name.replace(/\.\w+$/, '.mid')}
//           onDownload={handleDownload}
//           />
//         )}
//       </PageContainer>
//     </div>
//   );
// };

// export default UploadPage;


