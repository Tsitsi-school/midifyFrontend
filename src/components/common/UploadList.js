import React from 'react';
import styled from 'styled-components';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const FileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border: 0.5px solid var(--file-container-border-color);
    border-radius: 1px;
    margin-top: 10px;
    background-color: var(--file-container-background-color);
`;

const FileInfo = styled.div`
    display: flex;
    align-items: center;
`;

const FileIcon = styled(InsertDriveFileOutlinedIcon)`
    font-size: 2rem !important;
    margin-right: 8px;
    color: var(--file-info-color);
`;

const FileName = styled.span`
    font-size: 1rem;
    color: var(--file-info-color);
`;

const FileSize = styled.span`
    font-size: 0.9rem;
    color: var(--file-info-color);
`;

const UploadList = ({files, setUploadedFiles}) => {
    return files.map((file, index) => (
        <FileContainer key={file.id || index}> {/* Use file.id if available, fallback to index */}
            <FileInfo>
                <FileIcon/>
                <FileName>{file.name}</FileName>
            </FileInfo>
            <FileSize>{(file.size / 1024).toFixed(2)} KB</FileSize>
        </FileContainer>
    ));
};

export default UploadList;
