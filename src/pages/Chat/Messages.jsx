import React, { useState, useRef, useEffect } from "react";
import bot from "../../../public/images/chat/bot.svg";
import user from "../../../public/images/chat/user.svg";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { FaStopCircle } from "react-icons/fa";

const Messages = ({ messages }) => {
  const [currentText, setCurrentText] = useState(""); // Text to be converted to audio
  const [isPlaying, setIsPlaying] = useState(false); // Playback state
  const [timeElapsed, setTimeElapsed] = useState(0); // Elapsed time
  const utteranceRef = useRef(null); // Ref for the utterance
  const intervalRef = useRef(null); // Ref for interval updates
  const [playingIndex, setPlayingIndex] = useState(null); // Keeps track of the currently playing message

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      handleStop();
    };
  }, []);

  const handlePlay = (text, index) => {
    setPlayingIndex(index); // Set the currently playing index
    if (utteranceRef.current) {
      handleStop(); // Stop any current utterance
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentText(text);
      setTimeElapsed(0);

      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
      setTimeElapsed(0);
      utteranceRef.current = null;
      setPlayingIndex(null); // Reset to show the Play button
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
      setPlayingIndex(null); // Reset to show the Play button
      handleStop();
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    } else if (!isPlaying && utteranceRef.current) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setTimeElapsed(0);
    setCurrentText("");
    utteranceRef.current = null;
    clearInterval(intervalRef.current);
    setPlayingIndex(null); // Reset to show the Play button
  };

  return (
    <div className="flex flex-col w-full px-0 px-md-2">
      <div className="messages-container flex-1 overflow-y-auto mb-4 rounded-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 align-items-end ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            {msg.sender !== "user" && <img className="w-7" src={bot} alt="i" />}{" "}
            {msg.sender === "user" && (
              <Controls
                isPlaying={isPlaying}
                msg={msg.text}
                index={index}
                handlePause={handlePause}
                handlePlay={handlePlay}
                handleStop={handleStop}
                playingIndex={playingIndex}
              />
            )}
            <p
              className={`message mx-2 max-w-[75%] sm:max-w-[60%] mb-0 border-1 f-12 text-[#292929CC] border-[#DDDDDD] p-2 rounded-md ${
                msg.sender === "user" ? "send" : "res"
              }`}
            >
              {msg.text}
            </p>
            {msg.sender !== "user" && (
              <Controls
                msg={msg.text}
                isPlaying={isPlaying}
                index={index}
                handlePause={handlePause}
                handlePlay={handlePlay}
                handleStop={handleStop}
                playingIndex={playingIndex}
              />
            )}
            {msg.sender === "user" && (
              <img className="w-7" src={user} alt="i" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;

const Controls = ({
  playingIndex,
  index,
  msg,
  handlePause,
  handlePlay,
  handleStop,
  isPlaying,
}) => {
  return (
    <div className="flex gap-1 items-center mb-1 bg-gray-200 rounded-[12px] p-1">
      {playingIndex !== index ? (
        <FaCirclePlay
          className="cursor-pointer text-green-500 hover:scale-105 transition-transform"
          onClick={() => handlePlay(msg, index)}
        />
      ) : (
        <div className="flex gap-1 items-center transition-opacity duration-300 opacity-100">
          {isPlaying ? (
            <FaCirclePause
              className="cursor-pointer text-yellow-500 hover:scale-105 transition-transform"
              onClick={handlePause}
            />
          ) : (
            <FaCirclePlay
              className="cursor-pointer text-blue-500 hover:scale-105 transition-transform"
              onClick={handlePause}
            />
          )}
          <FaStopCircle
            className="cursor-pointer text-red-500 hover:scale-105 transition-transform"
            onClick={handleStop}
          />
        </div>
      )}
    </div>
  );
};
