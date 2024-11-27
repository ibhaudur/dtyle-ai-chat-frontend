import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { MdLibraryAdd } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { TbUpload } from "react-icons/tb";

export default function SingleImage(props) {
  const { label, handle, key_name, resolution } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg,image/png,image/gif";

    fileInput.onchange = () => {
      const file = fileInput.files[0];

      // Check file type and size
      const acceptedFileTypes = ["image/jpeg", "image/png", "image/gif"];
      if (
        !acceptedFileTypes.includes(file.type) ||
        file.size > 5 * 1024 * 1024
      ) {
        return;
      }
      const blobUrl = URL.createObjectURL(file);
      let event = { target: { name: key_name, files: [file] } };
      // handle(event);
      setSelectedImage(blobUrl);
    };

    fileInput.click();
  };
  const handleDeleteImage = () => {
    let event = { target: { name: key_name, files: "" } };
    // handle(event);
    setSelectedImage(null);
  };
  useEffect(() => {
    !props?.[key_name]?.type
      ? setSelectedImage(props?.[key_name])
      : setSelectedImage(URL.createObjectURL(props?.[key_name]));
  }, [props?.[key_name]]);

  return (
    <div className="mb-2">
      <label className="f-12">{label}</label>
      <div
        onClick={handleImageClick}
        className="border-2 border-dashed border-[#00F2DB] bg-[#02F2D80D] rounded-lg p-3"
      >
        {!selectedImage && (
          <p className="text-[#00F2DB] f-12 flex justify-center gap-2 align-items-center mb-2">
            <TbUpload /> Upload Documents
          </p>
        )}
        <div className="box mt-2">
          {selectedImage ? (
            <div className="flex justify-center">
              <img
                className={`w-16 cursur`}
                src={selectedImage}
                onClick={handleImageClick}
                alt="Selected"
              />
            </div>
          ) : (
            <small className="block text-[#08080899] text-center">
              with max up to 10MB and pdf, csv, doc or docx
            </small>
          )}
        </div>
      </div>
      {resolution && (
        <small className="Montserrat">Resolution: {resolution}</small>
      )}
    </div>
  );
}
