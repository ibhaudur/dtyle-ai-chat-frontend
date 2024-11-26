import React from "react";
import Logo from "../../../public/images/dtyle.svg";
import { Button, Col, Row } from "react-bootstrap";
import ChatBox from "./ChatBox";

const Chat = () => {
  return (
    <section className="flex justify-center flex-col align-items-center p-3 gap-3">
      <img className="mt-4" src={Logo} alt="logo" />
      <h3 className="text-3xl linear-text">
        Power Up Your Productivity with our Ai Agent
      </h3>
      <small className="mt-4">Start with</small>
      <Button className="bg-[#5743BC] min-w-56 f-12 p-2">Document</Button>
      <small className="c-gray">(Max 10MB - pdf, csv, doc or docx)</small>
      <small>or</small>
      <Row className="w-100 justify-center mt-5">
        <Col md={9}>
          <ChatBox />
        </Col>
      </Row>
    </section>
  );
};

export default Chat;
