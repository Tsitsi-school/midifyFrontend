import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import {UpdateDisabledOutlined} from '@mui/icons-material';
import {apiClient} from '../../api/midifyApi'; // Use the central API client


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

const UploadContainerSmall = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px;
    border: 5px dashed var(--upload-border-color);
    text-align: center;
    border-radius: 2px;
    color: var(--upload-container-bg);
    background-color: var(--upload-container-bg);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    gap: 20px;
    justify-content: center;
    align-items: center;
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

const Title = styled.h1`
    font-size: 4rem; /* Increase font size for emphasis */
    font-weight: bold;
    color: var(--text-color);
    text-align: center;
    padding: 20px;
`;

const Icon = styled(UploadFileOutlinedIcon)`
    font-size: 1.8rem !important;
    margin-right: 10px;
    vertical-align: -7px; /* Try adjusting to "middle" */
    /* For finer adjustments, use a value like -2px or -3px */
    /* vertical-align: -2px; */
`;


const ButtonText = styled.span`
    font-size: 1.1rem;
`;

const FileUpload = ({onDrop}) => {

    const [fileDropped, setFileDropped] = useState(false);

    const handleDrop = useCallback((acceptedFiles) => {
        console.log("Files dropped:", acceptedFiles);
        onDrop(acceptedFiles); // Pass all files to the parent component
        setFileDropped(true);
    }, [onDrop]);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: handleDrop,
        multiple: true, // Enable multiple files
    });

    return (
        <div>
            {/*{fileDropped ? (*/}
            {/*    <UploadContainerSmall {...getRootProps()}>*/}
            {/*        <input {...getInputProps()} />*/}
            {/*        <UploadButton>*/}
            {/*            <Icon/>*/}
            {/*            <ButtonText>CHOOSE MORE FILES OR DROP THEM HERE</ButtonText>*/}
            {/*        </UploadButton>*/}
            {/*    </UploadContainerSmall>*/}
            {/*) : (*/}
            <UploadContainer {...getRootProps()}>
                <input {...getInputProps()} />
                <UploadButton>
                    <Icon/>
                    <ButtonText>CHOOSE FILES</ButtonText>
                </UploadButton>
                <DropText>OR DROP FILES HERE</DropText>
            </UploadContainer>
            {/*)}*/}
        </div>
    );
};

export default FileUpload;
