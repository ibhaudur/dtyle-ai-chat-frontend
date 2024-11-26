import React, { useState, useRef, useEffect } from "react";
import audioIcon from "../../../public/images/chat/audio.svg";
import videoIcon from "../../../public/images/chat/video.svg";

const ChatBox = () => {
  const [message, setMessage] = useState(""); // State for the text input
  const [isRecording, setIsRecording] = useState(false); // State to manage recording
  const [audioUrl, setAudioUrl] = useState(null); // State to store the recorded audio URL
  const [recordingTime, setRecordingTime] = useState(0); // State to track recording time
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null); // Ref to keep track of the timer interval

  // Handle text input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Function to start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        audioChunks.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0); // Reset the timer

      // Start the timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  // Function to stop voice recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    clearInterval(timerRef.current); // Stop the timer
  };

  // Format recording time as mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="chatbox flex border items-center mb-3 p-2 w-100">
      <input
        type="text"
        placeholder="Ask Dtyle.Ai"
        value={message}
        onChange={handleInputChange}
        className="flex-1 p-2 rounded-md border-none focus:outline-none"
      />

      {/* Timer Display */}
      {isRecording && (
        <div className="mr-2 text-gray-500">{formatTime(recordingTime)}</div>
      )}

      {/* Voice Record Button */}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-3 rounded-full text-white me-2 focus:outline-none ${
          isRecording ? "bg-red-500" : "bg-[#F7F7F7]"
        }`}
      >
        {isRecording ? "⏹️" : <img src={audioIcon} alt="i" />}
      </button>
      <button
        //         onClick={isRecording ? stopRecording : startRecording}
        className={`p-3 rounded-full flex gap-2 f-12 align-items-center focus:outline-none ${
          false ? "bg-red-500" : "bg-[#F7F7F7]"
        }`}
      >
        {false ? (
          "⏹️"
        ) : (
          <>
            <img src={videoIcon} alt="Start Video Chat" />
            Start Video Chat
          </>
        )}
      </button>
    </div>
  );
};

export default ChatBox;
