import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import CustomInput from "../../component/Form/CustomInput";
import SingleImage from "../../component/Form/SingleImage";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";

const DocumentForm = ({ setOpen }) => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async () => {
    let formData = new FormData();
    for (let [key, value] of Object.entries(values)) {
      if (key === "docs") {
        value.map((a) => formData.append(key, a));
      }
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}upload-documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer a9EWMMu9faVgrncjh4WaKpTJZqKfvTO",
          },
        }
      );
      setValues({});
      setOpen(false);
      toast.dark(res.data);
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
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
          <SingleImage
            label="Upload Document"
            key_name="docs"
            handle={handleChange}
          />
        </Col>
      </Row>
      <Button className="bg-[#5743BC] w-100 f-12 p-2" onClick={handleSubmit}>
        Document Chat
      </Button>
    </div>
  );
};

export default DocumentForm;
