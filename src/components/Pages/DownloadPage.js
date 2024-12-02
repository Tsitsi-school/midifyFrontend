import React from 'react';
import styled from 'styled-components';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const PageContainer = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;       
  padding: 0px 40px;
  margin: 0;

`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: var(--title-color);
  text-align: center;
  // margin: 20px 0;
`;

const DownloadContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  justify-content: space-between;
  padding: 15px 20px;
  border: 0.5px solid var(--file-container-border-color);
  border-radius: 1px;
  background-color: var(--file-container-background-color);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for better separation */

`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FileIcon = styled(InsertDriveFileOutlinedIcon)`
  font-size: 2rem !important;
  margin-right: 8px; /* Adjust this to control spacing between icon and text */
  color: var(--file-info-color);
`;

const FileName = styled.span`
  font-size: 1rem;
  color: var(--file-info-color);
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

const DownloadIcon = styled(FileDownloadOutlinedIcon)`
//   font-size: 1.2rem;
//   margin-left: 8px;
// `;

const DownloadPage = ({ fileName, onDownload }) => {
  return (
    <div>
        <Title>Sheet Music to MIDI Converter</Title>
        <PageContainer>
        <DownloadContainer>
            <FileInfo>
            <FileIcon />
            <FileName>{fileName}</FileName>
            </FileInfo>
            <DownloadButton onClick={onDownload}>
            Download
            <DownloadIcon />
            </DownloadButton>
        </DownloadContainer>
        </PageContainer>
    </div>
  );
};

export default DownloadPage;
