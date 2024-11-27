import React, { useState } from "react";

const Messages = ({
  message,
  sendMessage,
  handleInputChange,
  setMessage,
  messages,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="messages-container flex-1 overflow-y-auto mb-4 p-2 rounded-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            <p
              className={`message mb-2 border-1 f-12 text-[#292929CC] border-[#DDDDDD] p-2 rounded-md ${
                msg.sender === "user" ? "send" : "res"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
