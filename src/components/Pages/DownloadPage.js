import React from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import '../pageStyles.css';

const DownloadPage = ({ fileName, onDownload }) => {
  return (
    <div>
      <h1 className="download-title">Sheet Music to MIDI Converter</h1>
      <div className="download-page-container">
        <div className="download-container">
          <div className="download-file-info">
            <InsertDriveFileOutlinedIcon className="download-file-icon" />
            <span className="download-file-name">{fileName}</span>
          </div>
          <button className="download-button" onClick={onDownload}>
            Download
            <FileDownloadOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
