import React, { useState } from "react";
import Logo from "../../../public/images/dtyle.svg";
import { Button, Col, Row } from "react-bootstrap";
import ChatBox from "./ChatBox";
import ModalBox from "../../component/Modal/ModalBox";
import Messages from "./Messages";
import CustomInput from "../../component/Form/CustomInput";
import SingleImage from "../../component/Form/SingleImage";

const Chat = () => {
  const [open, setOpen] = useState(false);
  // const [recordedText, setRecordedText] = useState("");
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
        {
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          sender: "bot",
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <section className="flex justify-center flex-col align-items-center p-3 gap-3">
      <ModalBox title="Upload a Document" open={open} setOpen={setOpen}>
        <div>
          <Row className="mb-3">
            <Col sm={6} md={6}>
              <CustomInput
                type="text"
                label="Conversation name"
                placeholder="Conversation name"
              />
            </Col>
            <Col sm={6} md={6}>
              <CustomInput
                type="text"
                label="Select Document"
                placeholder="Document name"
              />
            </Col>
            <Col md={12}>
              <SingleImage label="Upload Document" />
            </Col>
            <Col md={12}>
              <div>
                <ul>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <li
                      key={index}
                      className="flex justify-between border-b-2 p-2"
                    >
                      <small>{index + 1}.Document Name</small>
                      <small>PDF</small>
                      <small>9MB</small>
                      <small className="text-red-500 cursor-pointer">
                        Remove
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
          <Button
            className="bg-[#5743BC] w-100 f-12 p-2"
            onClick={() => setOpen(() => !open)}
          >
            Document Chat
          </Button>
        </div>
      </ModalBox>
      {messages.length == 0 && (
        <>
          <img className="mt-2" src={Logo} alt="logo" />
          <h3 className="text-lg sm:text-2xl md:text-3xl linear-text">
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
        </>
      )}
      <Row className="w-100 justify-center mt-2 mb-4 pb-4">
        <Col md={10}>
          <Messages
            message={message}
            messages={messages}
            setMessages={setMessages}
          />
        </Col>
      </Row>
      <ChatBox
        message={message}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        sendMessage={sendMessage}
      />
    </section>
  );
};

export default Chat;
