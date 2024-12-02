import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Header from '../Headers/pageHeader';
import { fetchUploadHistory } from '../../api/midifyApi';
import { format } from 'date-fns';

const PageContainer = styled.div`
  background-color: var(--history-background-color);

  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 40px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: var(--title-color);
  text-align: justify;
  margin: 40px;
`;

const HistoryList = styled.div`
  width: 100%;
  max-width: 100%; /* Limit the width of the list */
`;


const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: var(--history-item-color);
  border-radius: 2px; /* Rounds corners for each item */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow */
  margin-bottom: 15px; /* Adds space between items */
  border: 0.5px solid var(--list-item-border-color);
  
  &:last-child {
    margin-bottom: 0; /* Removes margin after the last item */
  }
`;


// const HistoryItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
//  

  
//   &:last-child {
//     margin-bottom: 0;
//   }
// `;


const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FileName = styled.span`
  font-size: 1rem;
  color: var(--text-color);
`;

const FileDate = styled.span`
  font-size: 0.9rem;
  color: var(--text-color);
  padding-left: 70%;
`;

const DownloadButton = styled.button`
  padding: 10px 20px;
  background-color: var(--upload-button-bg);
  color: var(--upload-button-text);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1a5cad;
  }
`;


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

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}`);
    // Implement download logic (e.g., download from a file URL provided in API response)
  };

  const formatFileName = (name) => {
    return name.startsWith('upload/') ? name.replace('upload/', '') : name;
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMMM dd, yyyy hh:mm a'); // Example: "November 30, 2024 02:30 PM"
    } catch (error) {
      console.error('Invalid date format:', date);
      return 'Invalid Date';
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!historyItems.length) return <p>No upload history available.</p>;

  return (
    <div>
      <Header />
      <PageContainer>
        <Title>History</Title>
        <HistoryList>
          {historyItems.map((item) => (
            <HistoryItem key={item.id}>
              <FileInfo>
                <InsertDriveFileOutlinedIcon />
                <FileName>{formatFileName(item.name) || 'Unnamed File'}</FileName>
              </FileInfo>
              <FileDate>{formatDate(item.date) || 'Unknown Date'}</FileDate>
              <DownloadButton onClick={() => handleDownload(item.name)}>
                Download
                <FileDownloadOutlinedIcon />
              </DownloadButton>
            </HistoryItem>
          ))}
        </HistoryList>
      </PageContainer>
    </div>
  );
};

export default HistoryPage;