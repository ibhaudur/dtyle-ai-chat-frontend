import React, { useState } from "react";
import bot from "../../../public/images/chat/bot.svg";
import user from "../../../public/images/chat/user.svg";

const Messages = ({
  messages,
}) => {
  return (
    <div className="flex flex-col w-full px-2">
      <div className="messages-container flex-1 overflow-y-auto mb-4 rounded-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 align-items-end ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            {msg.sender !== "user" && (
              <img className="w-7" src={bot} alt="i" />
            )}{" "}
            <p
              className={`message mx-2 max-w-[75%] sm:max-w-[60%] mb-0 border-1 f-12 text-[#292929CC] border-[#DDDDDD] p-2 rounded-md ${
                msg.sender === "user" ? "send" : "res"
              }`}
            >
              {msg.text}
            </p>
            {msg.sender === "user" && (
              <img className="w-7" src={user} alt="i" />
            )}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
