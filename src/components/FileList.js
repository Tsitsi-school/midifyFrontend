// import React from 'react';
// import styled from 'styled-components';
// import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'; // Material-UI icon for a file

// // const FileListContainer = styled.div`
// //   margin-top: 20px;
// //   width: 100%;
// //   max-width: 600px;
// // `;

// const FileListContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 10px 20px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   margin-top: 10px;
//   background-color: #ffffff;
// `;

// const FileItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   padding: 10px 15px;
// //   font-size: 0.9rem;
//   color: var( --file-info-color);
// `;

// const FileIcon = styled(InsertDriveFileOutlinedIcon)`
//   color: var( --file-info-color);
//   font-size: 50rem;
//   margin-right: 10px;
// `;

// const FileName = styled.span`
//   flex: 1rem;
//   font-weight: 500;
// `;

// const FileSize = styled.span`
//   font-size: 1rem;
//   color: var( --file-info-color);
// `;

// const FileList = ({ files }) => {
//   return (
//     <FileListContainer>
//       {files.map((file, index) => (
//         <FileItem key={index}>
//           <FileIcon /> {/* Icon for each file item */}
//           <FileName>{file.name}</FileName>
//           <FileSize>{(file.size / 1024).toFixed(2)} KB</FileSize>
//         </FileItem>
//       ))}
//     </FileListContainer>
//   );
// };

// export default FileList;
