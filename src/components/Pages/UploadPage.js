import React, {useState} from "react";
import Header from "../Headers/pageHeader.js";
import FileUpload from "../common/FileUpload.js";
import Description from "../common/Description.js";
import LoadingPage from "./LoadingPage.js";
import DownloadPage from "./DownloadPage.js";
import apiClient from "../../api/midifyApi.js";
import "../pageStyles.css";
import Layout from "../common/Layout.js";

const UploadPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isConverting, setIsConverting] = useState(false);
    const [conversionComplete, setConversionComplete] = useState(false);
    const [conversionProgress, setConversionProgress] = useState(0);
    const [midiFileUrl, setMidiFileUrl] = useState(null); // URL for merged MIDI file
    const [tempo, setTempo] = useState(120);
    const [timeSignature, setTimeSignature] = useState("4/4");
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleFileDrop = async (files) => {
        if (!files || files.length === 0) return;

        try {
            const uploadedFiles = [];
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);

                const response = await apiClient.post("/upload/", formData, {
                    headers: {"Content-Type": "multipart/form-data"},
                });
                console.log("Uploaded file response:", response.data);
                uploadedFiles.push(response.data);

                const uploadedFile = {
                    ...response.data, // File data from the backend
                    name: file.name,
                    size: file.size,
                };
                console.log("Uploaded file data ", uploadedFile);
                setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);

                // Generate preview URL for the file
                const previewUrl = URL.createObjectURL(file);
                setPreviewUrls((prevUrl) => [...(prevUrl || []), previewUrl]);
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            alert(
                `Error uploading files: ${error.response?.data?.message || error.message}`
            );
        }
    };

    const handleConvert = async () => {
        if (uploadedFiles.length === 0) {
            alert("No files to convert");
            return;
        }

        setIsConverting(true);
        setConversionComplete(false);
        setConversionProgress(0); // Reset progress to 0

        try {
            const token = localStorage.getItem("authToken"); // Retrieve the token

            let loadProgress = 0;

            // Fake loading progress (increases over time up to 95%)
            const fakeLoadingInterval = setInterval(() => {
                if (loadProgress < 95) {
                    const increment = Math.floor(Math.random() * 7) + 1; // Random whole number between 1 and 3
                    loadProgress = Math.min(loadProgress + increment, 95); // Cap at 95%
                    setConversionProgress(Math.round(loadProgress)); // Update progress as a whole number
                }
            }, 500);
            console.log("Conversion initiated.");


            const fileIds = uploadedFiles.map((file) => file.id);
            console.log("file id", uploadedFiles[0].id)
            console.log("file id", uploadedFiles[0].name)
            const response = await apiClient.post("/upload/batch_convert/", {
                file_ids: fileIds,
                tempo,
                timeSignature,
            });

            const statusCheckInterval = setInterval(async () => {
                try {
                    const statusResponse = await apiClient.get(`/upload/${uploadedFiles[0].id}/status/`, {
                        headers: {
                            ...(token && {Authorization: `Token ${token}`}),
                        },
                    });

                    const {status} = statusResponse.data;

                    if (status === "completed") {
                        // Stop fake loading and polling when completed
                        clearInterval(fakeLoadingInterval);
                        clearInterval(statusCheckInterval);
                        console.log("Batch conversion completed:", response.data);
                        setMidiFileUrl(response.data.merged_file_url); // Save the merged MIDI file URL


                        // Smoothly transition to 100%
                        let finalProgress = loadProgress;
                        const smoothCompletionInterval = setInterval(() => {
                            finalProgress += 5; // Increment by 1% at a time
                            setConversionProgress(finalProgress);
                            if (finalProgress >= 100) {
                                clearInterval(smoothCompletionInterval);
                                setIsConverting(false);
                                setConversionComplete(true);
                            }
                        }, 100);
                    } else if (status === "failed") {
                        // Handle failure
                        clearInterval(fakeLoadingInterval);
                        clearInterval(statusCheckInterval);
                        console.error("Conversion failed");
                        setIsConverting(false);
                        setConversionComplete(false);
                        alert("Conversion failed. Please try again.");
                    }
                } catch (error) {
                    clearInterval(fakeLoadingInterval);
                    clearInterval(statusCheckInterval);
                    console.error("Error fetching conversion status:", error.message);
                    alert("An error occurred while checking conversion status.");
                }
            }, 2000); // Poll every 2 seconds for actual status
        } catch (error) {
            console.error("Error during conversion:", error.response?.data || error.message);
            alert("Failed to initiate conversion. Please try again.");
            setIsConverting(false); // Reset in case of failure
        }
    };

    const handleDownload = async () => {
        try {
            const token = localStorage.getItem("authToken"); // Retrieve the token for authentication
            const response = await apiClient.get(`/upload/${uploadedFiles[0].id}/download/`, {
                responseType: "blob", // Handle binary file data
                headers: {
                    ...(token && {Authorization: `Token ${token}`}), // Include token if available
                },
            });

            // Process the downloaded file
            const blob = new Blob([response.data], {type: "audio/midi"});
            console.log(blob);
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${uploadedFiles[0]?.name.replace(/\.\w+$/, "")}_converted.mid`; // Provide a filename for the download
            link.click(); // Trigger the download
        } catch (error) {
            // Handle errors
            console.error(
                "Error during file download:",
                error.response?.data || error.message
            );
            alert("Failed to download the file. Please try again.");
        }
    };

    return (
        <Layout header={Header}>
            <div className="upload-page-container">
                {isConverting && <LoadingPage fileName={uploadedFiles[0]?.name} progress={conversionProgress}/>}
                {!isConverting && !conversionComplete && (
                    <div className="upload-centered-content">
                        <h1 className="download-title" style={{marginBottom: "20px"}}>Sheet Music to MIDI Converter</h1>
                        {previewUrls && previewUrls.length > 0 ? (
                            <>
                                <div className="image-preview-container">
                                    {previewUrls.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`Uploaded Preview ${index + 1}`}
                                            className="image-preview"
                                        />
                                    ))}
                                </div>
                                <div className="horizontal-container">
                                    <div className="input-metrics-container">
                                        <label className="label-metrics" htmlFor="tempo">
                                            Tempo (BPM)
                                        </label>
                                        <input
                                            className="input-metrics"
                                            type="number"
                                            id="tempo"
                                            value={tempo}
                                            onChange={(e) => setTempo(e.target.value)}
                                            placeholder="e.g., 120"
                                            min="40"
                                            max="240"
                                        />
                                    </div>
                                    <div className="input-metrics-container">
                                        <label
                                            className="label-metrics"
                                            htmlFor="timeSignature"
                                        >
                                            Time Signature
                                        </label>
                                        <input
                                            className="input-metrics"
                                            type="text"
                                            id="timeSignature"
                                            value={timeSignature}
                                            onChange={(e) => setTimeSignature(e.target.value)}
                                            placeholder="e.g., 4/4"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : null}
                        {/*{uploadedFiles.length > 0 && <UploadList files={uploadedFiles}/>}*/}
                        <FileUpload onDrop={handleFileDrop}/>
                        {previewUrls && previewUrls.length > 0 ? (
                            <button
                                className="upload-convert-button"
                                onClick={handleConvert}
                            >
                                Convert ➔
                            </button>
                        ) : <Description/>}

                    </div>
                )}
                {conversionComplete && (
                    <DownloadPage
                        fileID={uploadedFiles[0].id}
                        fileName={uploadedFiles[0]?.name.replace(/\.\w+$/, ".mid")}
                        files={uploadedFiles}
                        onDownload={handleDownload}
                    />
                )}
            </div>
        </Layout>
    );
};

export default UploadPage;
