/* global verovio */
import React, {useRef, useEffect, useState} from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import apiClient from "../../api/midifyApi";
import Soundfont from "soundfont-player";
import {Midi} from "@tonejs/midi";
import {Piano, MidiNumbers} from "react-piano";
import "../pageStyles.css";
import "react-piano/dist/styles.css";

const ProgressBarWrapper = ({currentTime, duration, onProgressClick}) => {
    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const newTime = (clickPosition / rect.width) * duration;
        onProgressClick(newTime);
    };

    return (
        <div className="progress-bar-midi" onClick={handleClick}>
            <div
                className="progress"
                style={{width: `${(currentTime / duration) * 100}%`}}
            ></div>
        </div>
    );
};

const DownloadPage = ({fileID, fileName, files, onDownload}) => {
    const [vrvToolkit, setVrvToolkit] = useState(null);
    const [meiDataList, setMeiDataList] = useState([]);
    const [error, setError] = useState("");
    const [midiBlob, setMidiBlob] = useState(null);
    const [activeNotes, setActiveNotes] = useState([]);
    const [timeouts, setTimeouts] = useState([]);
    const [playingNotes, setPlayingNotes] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const progressIntervalRef = useRef(null);
    const containerRefs = useRef([]);
    const [isCooldown, setIsCooldown] = useState(false); // Cooldown state
    const cooldownDelay = 500; // Delay in milliseconds (1 second)

    const handleButtonClick = () => {
        if (isCooldown) return; // Prevent spamming
        setIsCooldown(true);

        if (isPlaying) {
            stopMidi();
        } else {
            playMidi();
        }

        // Reset cooldown after the delay
        setTimeout(() => {
            setIsCooldown(false);
        }, cooldownDelay);
    };

    const fetchMeiFiles = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const meiDataResponses = await Promise.all(
                files.map((file) =>
                    apiClient.get(`/upload/${file.id}/mei/`, {
                        headers: {
                            ...(token && {Authorization: `Token ${token}`}),
                        },
                    })
                )
            );
            const meiDataArray = meiDataResponses.map((response) => response.data);
            setMeiDataList(meiDataArray);
        } catch (error) {
            console.error(
                "Error fetching MEI files:",
                error.response?.data || error.message
            );
            setError("Failed to fetch MEI files. Please try again.");
        }
    };

    const fetchMidiFile = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await apiClient.get(`/upload/${fileID}/download/`, {
                responseType: "blob",
                headers: {
                    ...(token && {Authorization: `Token ${token}`}),
                },
            });
            setMidiBlob(response.data);
        } catch (error) {
            console.error(
                "Error fetching MIDI file:",
                error.response?.data || error.message
            );
            setError("Failed to fetch the MIDI file. Please try again.");
        }
    };

    const startPlaybackAtTime = async (startTime) => {
        if (!midiBlob) return;
        stopMidi();
        setIsPlaying(true);

        try {
            const arrayBuffer = await midiBlob.arrayBuffer();
            const midi = new Midi(arrayBuffer);

            const audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            const gainNode = audioContext.createGain(); // Create a GainNode
            gainNode.gain.value = 5.0; // Increase the volume
            gainNode.connect(audioContext.destination);

            const piano = await Soundfont.instrument(
                audioContext,
                "acoustic_grand_piano",
                {
                    destination: gainNode,
                }
            );

            const newTimeouts = [];
            const newPlayingNotes = [];

            midi.tracks.forEach((track) => {
                track.notes.forEach((note) => {
                    if (note.time >= startTime) {
                        const adjustedStartTime =
                            audioContext.currentTime + (note.time - startTime);
                        const endTime = adjustedStartTime + note.duration;

                        // Schedule playback
                        const noteNode = piano.play(note.name, adjustedStartTime, {
                            duration: note.duration,
                        });
                        newPlayingNotes.push(noteNode);

                        // Schedule note activation
                        const activateTimeout = setTimeout(() => {
                            setActiveNotes((prev) => {
                                const midiNumber = MidiNumbers.fromNote(note.name);
                                if (!prev.includes(midiNumber)) {
                                    return [...prev, midiNumber];
                                }
                                return prev;
                            });
                        }, (note.time - startTime) * 1000);
                        newTimeouts.push(activateTimeout);

                        // Schedule note deactivation
                        const deactivateTimeout = setTimeout(() => {
                            setActiveNotes((prev) => {
                                const midiNumber = MidiNumbers.fromNote(note.name);
                                return prev.filter((n) => n !== midiNumber);
                            });
                        }, endTime * 1000);
                        newTimeouts.push(deactivateTimeout);
                    }
                });
            });

            setTimeouts(newTimeouts);
            setPlayingNotes(newPlayingNotes);
            setCurrentTime(startTime);

            progressIntervalRef.current = setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime >= midi.duration) {
                        stopMidi();
                        return midi.duration;
                    }
                    return prevTime + 0.1;
                });
            }, 100);
        } catch (err) {
            console.error("Error playing MIDI file:", err);
            setError("Failed to play the MIDI file.");
            setIsPlaying(false);
        }
    };

    const playMidi = async () => {
        if (!midiBlob || isPlaying) return;

        setIsPlaying(true);

        try {
            const arrayBuffer = await midiBlob.arrayBuffer();
            const midi = new Midi(arrayBuffer);

            setDuration(midi.duration); // Set the total duration of the MIDI file

            const audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 5.0;
            gainNode.connect(audioContext.destination);
            // Connect the instrument to the GainNode
            const piano = await Soundfont.instrument(
                audioContext,
                "acoustic_grand_piano",
                {
                    destination: gainNode,
                }
            );

            const newTimeouts = [];
            const newPlayingNotes = [];

            midi.tracks.forEach((track) => {
                track.notes.forEach((note) => {
                    const startTime = audioContext.currentTime + note.time;
                    const endTime = startTime + note.duration;
                    // Schedule piano playback and track the AudioNode
                    const noteNode = piano.play(note.name, startTime, {
                        duration: note.duration,
                    });
                    newPlayingNotes.push(noteNode);

                    // Schedule note activation
                    const activateTimeout = setTimeout(() => {
                        setActiveNotes((prev) => {
                            const midiNumber = MidiNumbers.fromNote(note.name);
                            if (!prev.includes(midiNumber)) {
                                return [...prev, midiNumber];
                            }
                            return prev; // Avoid duplicate notes
                        });
                    }, note.time * 1000);
                    newTimeouts.push(activateTimeout);

                    // Schedule note deactivation
                    const deactivateTimeout = setTimeout(() => {
                        setActiveNotes((prev) => {
                            const midiNumber = MidiNumbers.fromNote(note.name);
                            return prev.filter((n) => n !== midiNumber);
                        });
                    }, endTime * 1000);
                    newTimeouts.push(deactivateTimeout);
                });
            });

            setTimeouts(newTimeouts);
            setPlayingNotes(newPlayingNotes);

            // Start the progress bar updates
            progressIntervalRef.current = setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime >= midi.duration) {
                        stopMidi();
                        return midi.duration;
                    }
                    return prevTime + 0.1;
                });
            }, 100);
        } catch (err) {
            console.error("Error playing MIDI file:", err);
            setError("Failed to play the MIDI file.");
            setIsPlaying(false);
        }
    };

    const stopMidi = () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
        setTimeouts([]);

        // Stop all currently playing notes
        playingNotes.forEach((noteNode) => noteNode.stop());
        setPlayingNotes([]);

        setActiveNotes([]);
        setIsPlaying(false);

        // Stop the progress bar updates
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }

        // Reset the progress bar
        setCurrentTime(0);
    };

    useEffect(() => {
        if (!vrvToolkit) {
            const toolkit = new verovio.toolkit();
            setVrvToolkit(toolkit);
        }
    }, [vrvToolkit]);

    useEffect(() => {
        if (fileID) {
            fetchMeiFiles();
            fetchMidiFile();
        }
    }, [fileID]);

    useEffect(() => {
        meiDataList.forEach((meiData, index) => {
            renderMeiData(meiData, index);
        });
    }, [meiDataList, vrvToolkit]);

    const renderMeiData = (meiData, index) => {
        if (!vrvToolkit || !containerRefs.current[index]) return;

        try {
            vrvToolkit.setOptions({scale: 40});
            vrvToolkit.loadData(meiData);
            const totalPages = vrvToolkit.getPageCount();
            let svgContent = "";

            for (let i = 1; i <= totalPages; i++) {
                svgContent += vrvToolkit.renderToSVG(i);
            }

            containerRefs.current[index].innerHTML = svgContent;
        } catch (err) {
            console.error(`Verovio Render Error for file ${index + 1}:`, err.message);
            setError(`Error rendering MEI file ${index + 1}`);
        }
    };

    return (
        <div>
            <h1 className="download-title">Converted Files</h1>
            <div className="download-page-container">
                <div className="download-container">
                    <div className="download-file-info">
                        <InsertDriveFileOutlinedIcon className="download-file-icon"/>
                        <span className="download-file-name">{fileName}</span>
                    </div>
                    <button className="download-button" onClick={onDownload}>
                        Download <FileDownloadOutlinedIcon/>
                    </button>
                </div>
                {error && <p style={{color: "red"}}>{error}</p>}
                <div className="piano-container">
                    <Piano
                        noteRange={{
                            first: MidiNumbers.fromNote("A0"),
                            last: MidiNumbers.fromNote("C8"),
                        }}
                        playNote={() => {
                        }}
                        stopNote={() => {
                        }}
                        activeNotes={activeNotes}
                    />
                </div>
                <div className="player-container">
                    <button className="icon-button" onClick={handleButtonClick} disabled={isCooldown}>
                        {isPlaying ? <StopIcon/> : <PlayArrowIcon/>}
                    </button>
                    <ProgressBarWrapper
                        currentTime={currentTime}
                        duration={duration}
                        onProgressClick={(newTime) => startPlaybackAtTime(newTime)}
                    />
                </div>
                <div className="mei-display-container">
                    {meiDataList.map((_, index) => (
                        <div
                            key={index}
                            className="mei-container"
                            ref={(el) => (containerRefs.current[index] = el)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DownloadPage;
