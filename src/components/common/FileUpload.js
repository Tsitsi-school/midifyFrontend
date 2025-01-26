import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';


const UploadContainer = styled.div`
    border: 5px dashed var(--upload-border-color);
    padding: 150px;
    text-align: center;
    border-radius: 2px;
    color: var(--upload-container-bg);
    background-color: var(--upload-container-bg);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
`;


const UploadButton = styled.button`
    //display: flex;
    align-items: center;
    padding: 15px 35px;
    background-color: var(--upload-button-bg);
    color: var(--upload-button-text);
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s ease;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3); /* Shadow added */


    &:hover {
        background-color: #4a2d9c;
    }
`;

const DropText = styled.p`
    font-size: 0.6rem;
    color: var(--drop-text-color);
    margin-top: 10px;
    font-weight: bold;
`;

const Icon = styled(UploadFileOutlinedIcon)`
    font-size: 1.8rem !important;
    margin-right: 10px;
    vertical-align: -7px;
`;


const ButtonText = styled.span`
    font-size: 1.1rem;
`;

const FileUpload = ({onDrop}) => {

    const handleDrop = useCallback((acceptedFiles) => {
        console.log("Files dropped:", acceptedFiles);
        onDrop(acceptedFiles);
    }, [onDrop]);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: handleDrop,
        multiple: true,
    });

    return (
        <div>
            <UploadContainer {...getRootProps()}>
                <input {...getInputProps()} />
                <UploadButton>
                    <Icon/>
                    <ButtonText>CHOOSE FILES</ButtonText>
                </UploadButton>
                <DropText>OR DROP FILES HERE</DropText>
            </UploadContainer>
        </div>
    );
};

export default FileUpload;
