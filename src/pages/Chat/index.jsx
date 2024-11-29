import React, { useState } from "react";
import Logo from "../../../public/images/dtyle.svg";
import { Button, Col, Row } from "react-bootstrap";
import ChatBox from "./ChatBox";
import ModalBox from "../../component/Modal/ModalBox";
import Messages from "./Messages";
import CustomInput from "../../component/Form/CustomInput";
import SingleImage from "../../component/Form/SingleImage";
import DocumentForm from "./DocumentForm";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
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
    <section
      className="flex justify-center flex-col align-items-center gap-3"
      style={{ minHeight: "80vh" }}
    >
      <ModalBox title="Upload a Document" open={open} setOpen={setOpen}>
        <DocumentForm setOpen={setOpen} />
      </ModalBox>
      {messages.length == 0 && (
        <>
          <img className="mt-2" src={Logo} alt="logo" />
          <h3 className="text-lg sm:text-2xl md:text-3xl text-center linear-text">
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
          <div className="flex align-items-center">
            <input
              type="text"
              className="border-1 h-8 rounded-s-[10px] p-1 px-2"
              placeholder="Website Url"
            />
            <Button className="bg-[#5743BC] rounded-s-[0px] h-8 f-12">
              Fetch
            </Button>{" "}
          </div>
        </>
      )}
      <Row className="w-100 justify-end mt-2 mb-4 pb-5">
        <Col md={8}>
          <Messages messages={messages} />
        </Col>
        {messages.length !== 0 && (
          <Col md={2} className="px-0 d-none d-md-block">
            <div className="sticky top-20">
              <small>Chat with</small>
              <Button
                className="bg-[#5743BC] w-100 f-12 mt-2 p-2"
                onClick={() => setOpen(() => !open)}
              >
                Document
              </Button>
              <small className="c-gray f-9">
                (Max 10MB - pdf, csv, doc or docx)
              </small>
              {videoURL && (
                <video controls className="mt-4 w-44">
                  <source src={videoURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </Col>
        )}
      </Row>
      <ChatBox
        message={message}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        sendMessage={sendMessage}
        setVideoURL={setVideoURL}
      />
      <div className="footer"></div>
    </section>
  );
};

export default Chat;
