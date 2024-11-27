import React, { useState } from "react";
import Logo from "../../../public/images/dtyle.svg";
import { Button, Col, Row } from "react-bootstrap";
import ChatBox from "./ChatBox";
import ModalBox from "../../component/Modal/ModalBox";
import Messages from "./Messages";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [recordedText, setRecordedText] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages([...messages, { text: message, sender: "user" }]);
    setMessage("");

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "This is a bot response!", sender: "bot" },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  console.log(messages);
  return (
    <section className="flex justify-center flex-col align-items-center p-3 gap-3">
      <ModalBox title="Upload a Document" open={open}>
        <div>
          <Button
            className="bg-[#5743BC] w-100 f-12 p-2"
            onClick={() => setOpen(() => !open)}
          >
            Document Chat
          </Button>
        </div>
      </ModalBox>
      <img className="mt-4" src={Logo} alt="logo" />
      <h3 className="text-3xl linear-text">
        Power Up Your Productivity with our Ai Agent
      </h3>
      <small className="mt-4">Start with</small>
      <Button
        className="bg-[#5743BC] min-w-56 f-12 p-2"
        onClick={() => setOpen(() => !open)}
      >
        Document
      </Button>
      <small className="c-gray">(Max 10MB - pdf, csv, doc or docx)</small>
      <small>or</small>
      {recordedText && (
        <div className="mt-4 p-2 bg-gray-100 rounded-md w-full">
          <strong>Transcribed Text:</strong>
          <p>{recordedText}</p>
        </div>
      )}
      <Row className="w-100 justify-center mt-5">
        <Col md={9}>
          <Messages
            message={message}
            messages={messages}
            setMessages={setMessages}
          />
          <ChatBox
            message={message}
            recordedText={recordedText}
            setRecordedText={setRecordedText}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            sendMessage={sendMessage}
          />
        </Col>
      </Row>
    </section>
  );
};

export default Chat;
