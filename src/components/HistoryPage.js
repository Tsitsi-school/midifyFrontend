import React from 'react';
import styled from 'styled-components';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Header from './pageHeader';

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

// const HistoryList = styled.div`
//   width: 100%;
//   max-width: 100%;
// //   background-color: var(--history-item-color);
//   background-color: green;
//   border-radius: 2px;
//   overflow: hidden;
//   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
//   margin-bottom: 15px; /* Adds space between items */

    

// `;

const HistoryList = styled.div`
  width: 100%;
  max-width: 100%; /* Limit the width of the list */
`;

// const HistoryItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
//   background-color: #fff; /* Background color for each item */
//   border-radius: 2px; /* Rounds corners for each item */
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: adds a subtle shadow */

//   &:last-child {
//     margin-bottom: 0; /* Removes margin after the last item */
//   }
// `;

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
  // Sample data for history items
  const historyItems = [
    { id: 1, name: 'Sheet_Music_1.mid', date: '12 Aug 2024' },
    { id: 2, name: 'Sheet_Music_2.mid', date: '31 Aug 2024' },
    { id: 3, name: 'Sheet_Music_3.mid', date: '8 Sept 2024' },
    { id: 4, name: 'Sheet_Music_4.mid', date: '21 Sept 2024' },
  ];

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}`);
    // Implement actual download logic here
  };

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
                <FileName>{item.name}</FileName>
                </FileInfo>
                <FileDate>{item.date}</FileDate>
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
