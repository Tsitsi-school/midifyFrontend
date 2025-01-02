// import React from 'react';
// // import styled from 'styled-components';
// import { useEffect, useState } from 'react';
// import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import Header from '../Headers/pageHeader';
// import { fetchUploadHistory } from '../../api/midifyApi';
// import { format } from 'date-fns';
// import '../pageStyles.css'
// import Layout from '../common/Layout';


// const HistoryPage = () => {
//   const [historyItems, setHistoryItems] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const data = await fetchUploadHistory(); // Fetch history from API
//         setHistoryItems(data); // Update state with fetched data
//       } catch (error) {
//         setError('Failed to fetch upload history.');
//         console.error('Error fetching upload history:', error);
//       }
//     };
//     fetchHistory();
//   }, []);

//   const handleDownload = (fileName) => {
//     alert(`Downloading ${fileName}`);
//     // Implement download logic (e.g., download from a file URL provided in API response)
//   };

//   // const handleDownload = async (fileName) => {
//   //   try {
//   //     // Make a request to get the file URL or binary data
//   //     const response = await apiClient.get(`/download/${fileName}`, {
//   //       responseType: 'blob', // Ensure the response is treated as binary data
//   //     });
  
//   //     // Create a blob URL for the file
//   //     const blob = new Blob([response.data]);
//   //     const url = window.URL.createObjectURL(blob);
  
//   //     // Create a temporary anchor element to trigger the download
//   //     const link = document.createElement('a');
//   //     link.href = url;
//   //     link.download = fileName; // Name of the downloaded file
//   //     document.body.appendChild(link);
//   //     link.click();
  
//   //     // Cleanup: remove the anchor and revoke the blob URL
//   //     document.body.removeChild(link);
//   //     window.URL.revokeObjectURL(url);
  
//   //     console.log(`${fileName} downloaded successfully`);
//   //   } catch (error) {
//   //     console.error(`Error downloading ${fileName}:`, error.message);
//   //     alert('Failed to download the file. Please try again.');
//   //   }
//   // };
  

//   const formatFileName = (name) => {
//     return name.startsWith('upload/') ? name.replace('upload/', '') : name;
//   };

//   const formatDate = (date) => {
//     try {
//       return format(new Date(date), 'MMMM dd, yyyy hh:mm a'); // Example: "November 30, 2024 02:30 PM"
//     } catch (error) {
//       console.error('Invalid date format:', date);
//       return 'Invalid Date';
//     }
//   };

//   if (error) return <p style={{ color: 'red' }}>{error}</p>;
//   if (!historyItems.length) return <p>No upload history available.</p>;

//   return (
//     <Layout header={Header}>
//       <div className="history-page-container">
//         <h1 className="history-title">History</h1>
//         <div className="history-list">
//           {historyItems.map((item) => (
//             <div className="history-item" key={item.id}>
//               <div className="history-file-info">
//                 <InsertDriveFileOutlinedIcon />
//                 <span className="history-file-name">{formatFileName(item.name) || 'Unnamed File'}</span>
//                 <span className="history-file-date">{formatDate(item.date) || 'Unknown Date'}</span>
//               <button
//                 className="history-download-button"
//                 onClick={() => handleDownload(item.name)}
//               >
//                 Download
//                 <FileDownloadOutlinedIcon />
//               </button>
//               </div>
              
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );

// };

// export default HistoryPage;


import React, { useEffect, useState } from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Header from '../Headers/pageHeader';
import { fetchImage, fetchUploadHistory } from '../../api/midifyApi';
import { format } from 'date-fns';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import '../pageStyles.css';

const HistoryPage = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await fetchUploadHistory(); // Fetch history from API
        setHistoryItems(data); // Update state with fetched data
      } catch (error) {
        setError('Failed to fetch upload history.');
        console.error('Error fetching upload history:', error);
      }
    };
    fetchHistory();
  }, []);

  const handleMIDIDownload = (fileName) => {
        alert(`Mocking Midi Download ${fileName}`);
        // Implement download logic (e.g., download from a file URL provided in API response)
  };

  const handleImageDownload = async (uploadId) => {
    try {
      // Fetch the image file from the server
      const blob = await fetchImage(uploadId);
  
      // Trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob); // Create a URL from the blob
      link.download = `image_${uploadId}.png`; // Provide a custom filename
      link.click();
  
      console.log(`Image with ID ${uploadId} downloaded successfully.`);
    } catch (error) {
      console.error(`Error downloading image with ID ${uploadId}:`, error.message);
      alert('Failed to download the image. Please try again.');
    }
  };
  

  const formatFileName = (name) => {
    return name.startsWith('upload/') ? name.replace('upload/', '') : name;
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMMM dd, yyyy hh:mm a');
    } catch (error) {
      console.error('Invalid date format:', date);
      return 'Invalid Date';
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!historyItems.length) {
  
    return (
      <Layout header={Header}>
        <div className="history-page-container no-history-container">
          <div className="no-history-content">
            <InsertDriveFileOutlinedIcon className="no-history-icon" />
            <h2>No Upload History Found</h2>
            <p>You haven’t uploaded any files yet. Start by uploading a file to see your history here.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // I need to add option to download the actual midi
  return (
    <Layout header={Header}>
      <div className="history-page-container">
        <h1 className="history-title">History</h1>
        <div className="history-list">
          {historyItems.map((item) => (
            <div className="history-item" key={item.id}>
              <div className="history-file-info">
                <InsertDriveFileOutlinedIcon />
                  <span className="history-file-name">{formatFileName(item.name) || 'Unnamed File'}</span>
                  <span className="history-file-date">{formatDate(item.date) || 'Unknown Date'}</span>
                <button
                  className="history-download-button"
                  onClick={() => handleMIDIDownload(`${item.name}.mid`)} 
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
