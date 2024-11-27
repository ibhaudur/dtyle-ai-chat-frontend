import React, { useState, useRef, useEffect } from "react";
import audioIcon from "../../../public/images/chat/audio.svg";
import videoIcon from "../../../public/images/chat/video.svg";
import { BsRecord2 } from "react-icons/bs";

const ChatBox = ({
  message,
  recordedText,
  setRecordedText,
  handleInputChange,
  handleKeyPress,
  sendMessage,
}) => {
  const [isRecording, setIsRecording] = useState(false); // State to manage recording
  const recognitionRef = useRef(null); // Ref to manage speech recognition instance
  const [recordingTime, setRecordingTime] = useState(0); // State to track recording time
  const timerRef = useRef(null); // Ref to track the timer interval

  // Format recording time as mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Initialize SpeechRecognition
  const initSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US"; // Set language
      recognition.continuous = true; // Keep recognizing until stopped
      recognition.interimResults = false; // Final results only

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setRecordedText(transcript);
      };

      recognition.onerror = (err) => {
        console.error("Speech Recognition Error:", err);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Your browser does not support Speech Recognition.");
    }
  };

  // Start recording
  const startRecording = () => {
    if (!recognitionRef.current) initSpeechRecognition();
    setIsRecording(true);
    recognitionRef.current?.start();

    // Start the timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  // Stop recording
  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current?.stop();

    // Clear the timer
    clearInterval(timerRef.current);
    setRecordingTime(0); // Reset recording time
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="chatbox flex flex-col border items-center mb-3 p-2 w-full">
      <div className="flex items-center w-full">
        <input
          type="text"
          placeholder="Ask Dtyle.Ai"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 rounded-md border-none focus:outline-none"
        />
        {message ? (
          <button onClick={sendMessage}>Send</button>
        ) : (
          <div className="flex">
            {isRecording && (
              <div className="mr-2 text-gray-500">
                {formatTime(recordingTime)}
              </div>
            )}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`${
                isRecording ? "p-2" : "p-3"
              } rounded-full text-white me-2 focus:outline-none bg-[#F7F7F7]`}
            >
              {isRecording ? (
                <BsRecord2 className="text-red-500 text-2xl" />
              ) : (
                <img src={audioIcon} alt="Audio Icon" />
              )}
            </button>
            <button className="p-3 rounded-full flex gap-2 f-12 align-items-center focus:outline-none bg-[#F7F7F7]">
              <img src={videoIcon} alt="Start Video Chat" />
              Start Video Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
