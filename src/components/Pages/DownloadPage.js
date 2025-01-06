// import React from 'react';
// import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import '../pageStyles.css';

// const DownloadPage = ({ fileName, onDownload }) => {
//   return (
//     <div>
//       <h1 className="download-title">Sheet Music to MIDI Converter</h1>
//       <div className="download-page-container">
//         <div className="download-container">
//           <div className="download-file-info">
//             <InsertDriveFileOutlinedIcon className="download-file-icon" />
//             <span className="download-file-name">{fileName}</span>
//           </div>
//           <button className="download-button" onClick={onDownload}>
//             Download
//             <FileDownloadOutlinedIcon />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DownloadPage;

import React, { useEffect, useState } from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import '../pageStyles.css';


const DownloadPage = ({ fileName, onDownload, midiFileBlob }) => {
  const [midiUrl, setMidiUrl] = useState(null);

  useEffect(() => {
          console.log("here is the blob", midiFileBlob);

    if (midiFileBlob) {
      const url = URL.createObjectURL(midiFileBlob);
      setMidiUrl(url); // Create URL for audio playback
      console.log("here is the blob", midiFileBlob);
      console.log("url here",url);
      return () => URL.revokeObjectURL(url); // Clean up object URL
    }
  }, [midiFileBlob]);
  

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
            Download <FileDownloadOutlinedIcon />
          </button>
        </div>
        {/* Audio player placed below the download-container */}
        {/* {midiUrl && (
          <div className="audio-player-container">
            <h3>Preview MIDI File</h3>
            <audio controls>
              <source src={midiUrl} type="audio/midi" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DownloadPage;
