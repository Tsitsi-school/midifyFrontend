/* global verovio */

import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import apiClient from "../../api/midifyApi";
import Soundfont from "soundfont-player";
import { Midi } from "@tonejs/midi";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

const PageContainer = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--title-color);
  text-align: center;
  background-color: var(--background-color);
  padding: 40px;
`;

const PlayerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  gap: 20px; /* Space between elements */
  height: 100%; /* Ensure it takes the full height of its parent */
    margin: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--button-bg);
  color: var(--button-text);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1a5cad;
  }

  svg {
    margin-left: 8px;
  }`
;

const IconButton = styled.button`
  background-color: var(--button-bg);
  color: var(--button-text);
  height: 40px;
  width: 40px;
  border-radius: 9999px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1a5cad;
  }`
;

const DownloadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  padding: 15px 20px;
  border: 1px solid var(--file-container-border-color);
  border-radius: 8px;
  background-color: var(--file-container-background-color);
  margin-bottom: 20px;`
;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
    gap : 10px;`
;

const FileIcon = styled(InsertDriveFileOutlinedIcon)`
  font-size: 2rem !important;
  margin-right: 8px;
  color: var(--file-info-color);`
;

const FileName = styled.span`
  font-size: 1rem;
  color: var(--file-info-color);`
;

const DownloadButton = styled.button`
  display: flex; /* Enables flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  padding: 10px 20px;
  gap: 5px;
  background-color: var(--upload-button-bg);
  color: var(--upload-button-text);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1a5cad;
  }
`;

const OSMDContainer = styled.div`
  width: 50%;
  height: auto;
  border: 1px solid #ccc;
  margin-top: 20px;
  overflow: auto;
  background-color: #fff;
  border-radius: 10px;  

  svg {
    width: 100%;
    height: auto;
  }`
;

const PianoContainer = styled.div`
    margin: 20px;
    width: 80%;
    height: 250px; /* Add a height to make it more prominent */
    border: 5px solid #4e31aa;
    padding: 10px;
    border-radius: 10px;

    .ReactPiano__Key {
        border: 1px solid #ccc; /* Add borders for better visibility */
    }

    .ReactPiano__Key--natural {
        background-color: #fff;
    }

    .ReactPiano__Key--accidental {
        background-color: #000;
    }

    .ReactPiano__Key--active {
        background-color: #3795BD; /* Highlight active keys */
    }
`
;

const ProgressBar = styled.div`
  width: 75%;
  height: 30px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative; /* Add this for positioning */

  .progress {
    height: 100%;
    background-color: #3795bd;
    transition: width 0.1s ease;
  }
`;

const ProgressBarWrapper = ({ currentTime, duration, onProgressClick }) => {
  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left; // Click position relative to the progress bar
    const newTime = (clickPosition / rect.width) * duration; // Calculate the new time
    onProgressClick(newTime);
  };

  return (
    <ProgressBar onClick={handleClick}>
      <div
        className="progress"
        style={{ width: `${(currentTime / duration) * 100}%` }}
      ></div>
    </ProgressBar>
  );
};

const DownloadPage = ({ fileID, fileName, onDownload }) => {
  const containerRef = useRef(null);
  const [vrvToolkit, setVrvToolkit] = useState(null);
  const [meiData, setMeiData] = useState(null);
  const [error, setError] = useState("");
  const [midiBlob, setMidiBlob] = useState(null); // Store the MIDI blob
  const [activeNotes, setActiveNotes] = useState([]); // Active notes for piano visualization
  const [timeouts, setTimeouts] = useState([]); // Track all scheduled timeouts
  const [playingNotes, setPlayingNotes] = useState([]); // Track active AudioNodes
  const [isPlaying, setIsPlaying] = useState(false); // Playback status
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  const [duration, setDuration] = useState(0); // Total duration of the MIDI file
  const progressIntervalRef = useRef(null); // Reference to the interval for progress updates

  const fetchMeiFile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await apiClient.get(`/upload/${fileID}/mei/`, {
        headers: {
          ...(token && { Authorization: `Token ${token}` }),
        },
      });
      setMeiData(response.data);
    } catch (error) {
      console.error("Error fetching MEI file:", error.response?.data || error.message);
      setError("Failed to fetch MEI file. Please try again.");
    }
  };

  const fetchMidiFile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await apiClient.get(`/upload/${fileID}/download/`, {
        responseType: "blob",
        headers: {
          ...(token && { Authorization:` Token ${token}`}),
        },
      });
      setMidiBlob(response.data);
    } catch (error) {
      console.error("Error fetching MIDI file:", error.response?.data || error.message);
      setError("Failed to fetch the MIDI file. Please try again.");
    }
  };

  const startPlaybackAtTime = async (startTime) => {
  if (!midiBlob) return;

  stopMidi(); // Stop the current playback
  setIsPlaying(true);

  try {
    const arrayBuffer = await midiBlob.arrayBuffer();
    const midi = new Midi(arrayBuffer);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain(); // Create a GainNode
    gainNode.gain.value = 5.0; // Increase the volume
    gainNode.connect(audioContext.destination);

    const piano = await Soundfont.instrument(audioContext, "acoustic_grand_piano", {
      destination: gainNode,
    });

    const newTimeouts = [];
    const newPlayingNotes = [];

    midi.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        if (note.time >= startTime) {
          const adjustedStartTime = audioContext.currentTime + (note.time - startTime);
          const endTime = adjustedStartTime + note.duration;

          // Schedule playback
          const noteNode = piano.play(note.name, adjustedStartTime, { duration: note.duration });
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

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const gainNode = audioContext.createGain(); // Create a GainNode
        gainNode.gain.value = 5.0; // Increase the volume (2.0 means double the normal volume)
        gainNode.connect(audioContext.destination); // Connect the GainNode to the audio context

        const piano = await Soundfont.instrument(audioContext, "acoustic_grand_piano", {
            destination: gainNode, // Connect the instrument to the GainNode
        });

        const newTimeouts = [];
        const newPlayingNotes = [];

        midi.tracks.forEach((track) => {
            track.notes.forEach((note) => {
                const startTime = audioContext.currentTime + note.time;
                const endTime = startTime + note.duration;

                // Schedule piano playback and track the AudioNode
                const noteNode = piano.play(note.name, startTime, { duration: note.duration });
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
                        return prev.filter((n) => n !== midiNumber); // Remove only the specific note
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
                    return midi.duration; // Ensure it doesn't exceed the total duration
                }
                return prevTime + 0.1; // Increment progress every 100ms
            });
        }, 100);
    } catch (err) {
        console.error("Error playing MIDI file:", err);
        setError("Failed to play the MIDI file.");
        setIsPlaying(false);
    }
};


  const stopMidi = () => {
    // Clear all scheduled timeouts
    timeouts.forEach((timeout) => clearTimeout(timeout));
    setTimeouts([]);

    // Stop all currently playing notes
    playingNotes.forEach((noteNode) => noteNode.stop());
    setPlayingNotes([]);

    setActiveNotes([]); // Clear active notes
    setIsPlaying(false);

    // Stop the progress bar updates
    if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
    }

    // Reset the progress bar
    setCurrentTime(0); // Reset progress to the beginning
};

  useEffect(() => {
    if (!vrvToolkit) {
      const toolkit = new verovio.toolkit();
      setVrvToolkit(toolkit);
    }
  }, [vrvToolkit]);

  useEffect(() => {
    if (fileID) {
      fetchMeiFile();
      fetchMidiFile();
    }
  }, [fileID]);

  useEffect(() => {
    if (meiData && vrvToolkit && containerRef.current) {
      try {
        vrvToolkit.setOptions({ scale: 40 });
        vrvToolkit.loadData(meiData);
        const totalPages = vrvToolkit.getPageCount();
        let svgContent = "";

        for (let i = 1; i <= totalPages; i++) {
          svgContent += vrvToolkit.renderToSVG(i);
        }

        containerRef.current.innerHTML = svgContent;
      } catch (err) {
        console.error("Verovio Render Error:", err);
        setError(`Error rendering sheet music: ${err.message}`);
      }
    }
  }, [meiData, vrvToolkit]);

  return (
    <div>
      <Title>Sheet Music Visualizer</Title>
      <PageContainer>
        <DownloadContainer>
          <FileInfo>
            <InsertDriveFileOutlinedIcon />
            <FileName>{fileName || "No file selected"}</FileName>
          </FileInfo>
          <DownloadButton onClick={onDownload}>
            Download
            <FileDownloadOutlinedIcon />
          </DownloadButton>
        </DownloadContainer>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <PianoContainer>
          <Piano
            noteRange={{ first: MidiNumbers.fromNote("A0"), last: MidiNumbers.fromNote("C8") }}
            playNote={() => {}} // Disable manual play
            stopNote={() => {}}
            activeNotes={activeNotes} // Highlight active notes
          />
        </PianoContainer>
        <PlayerContainer>
            <IconButton onClick={isPlaying ? stopMidi : playMidi}>
              {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
            </IconButton>
            <ProgressBarWrapper
              currentTime={currentTime}
              duration={duration}
              onProgressClick={(newTime) => startPlaybackAtTime(newTime)}
            />
        </PlayerContainer>
        <OSMDContainer ref={containerRef} />
      </PageContainer>
    </div>
  );
};

export default DownloadPage;