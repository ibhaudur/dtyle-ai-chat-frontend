import React, { useState, useRef, useEffect } from "react";
import audioIcon from "../../../public/images/chat/audio.svg";
import videoIcon from "../../../public/images/chat/video.svg";
import { BsRecord2 } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { transcribeAudioWithGoogle } from "./utils/video";

const ChatBox = ({
  message,
  handleInputChange,
  handleKeyPress,
  sendMessage,
  setVideoURL,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoStream, setVideoStream] = useState(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const videoRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const initSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (e) => {
        const transcript = Array.from(e.results)
          .map((result) => result[0].transcript)
          .join("");
        const event = { target: { value: transcript } };
        handleInputChange(event);
      };

      recognition.onerror = (err) => {
        console.error("Speech Recognition Error:", err);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Your browser does not support Speech Recognition.");
    }
  };

  const startRecording = () => {
    if (!recognitionRef.current) initSpeechRecognition();
    setIsRecording(true);
    recognitionRef.current?.start();

    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current?.stop();
    clearInterval(timerRef.current);
    setRecordingTime(0);
  };

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        setVideoURL(URL.createObjectURL(blob));
        transcribeAudioFromVideo(blob);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;

      setVideoStream(stream); // Save the stream to display in the video element
      setIsVideoRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing camera or microphone:", error);
    }
  };

  const stopVideoRecording = () => {
    setIsVideoRecording(false);
    mediaRecorderRef.current?.stop();
    videoStream?.getTracks().forEach((track) => track.stop());
    setVideoStream(null);
    clearInterval(timerRef.current);
    setRecordingTime(0);
  };

  const transcribeAudioFromVideo = async (videoBlob) => {
    transcribeAudioWithGoogle(videoBlob);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div className="chatbox flex flex-col border items-center mb-3 p-2 w-full z-[9999]">
      <div className="flex items-center w-full">
        <input
          type="text"
          placeholder="Ask Dtyle.Ai"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 rounded-md border-none focus:outline-none"
        />
        {message && !isRecording && !isVideoRecording ? (
          <button
            onClick={sendMessage}
            className="p-2 rounded-full text-white me-2 focus:outline-none bg-[#F7F7F7]"
          >
            <IoMdSend className="text-[#58BCFF] text-2xl" />
          </button>
        ) : (
          <div className="flex align-items-center gap-2">
            {isRecording || isVideoRecording ? (
              <div className="text-gray-500">{formatTime(recordingTime)}</div>
            ) : null}
            {!isVideoRecording && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`${
                  isRecording ? "p-2" : "p-3"
                } rounded-full text-white focus:outline-none bg-[#F7F7F7]`}
              >
                {isRecording ? (
                  <BsRecord2 className="text-red-500 text-2xl" />
                ) : (
                  <img src={audioIcon} alt="Audio Icon" />
                )}
              </button>
            )}
            {!isRecording && (
              <button
                onClick={
                  isVideoRecording ? stopVideoRecording : startVideoRecording
                }
                className="p-3 rounded-full flex gap-2 f-12 align-items-center focus:outline-none bg-[#F7F7F7]"
              >
                {isVideoRecording ? (
                  <>
                    Stop Video
                    <BsRecord2 className="text-red-500 text-2xl" />
                  </>
                ) : (
                  <img src={videoIcon} alt="Start Video Chat" />
                )}
              </button>
            )}
          </div>
        )}
      </div>
      {isVideoRecording && videoStream && (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-2 rounded shadow-lg h-80 flex flex-col items-center">
            <video ref={videoRef} autoPlay muted className="w-full h-60" />
            <button
              onClick={stopVideoRecording}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Stop Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
