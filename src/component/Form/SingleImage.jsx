import React, { useState, useEffect, useMemo } from "react";
import { TbUpload } from "react-icons/tb";

export default function SingleImage(props) {
  const { label, key_name, resolution } = props;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.csv,.doc,.docx";
    fileInput.multiple = true; // Allow multiple files

    fileInput.onchange = () => {
      const files = Array.from(fileInput.files);

      // Check file type and size
      const acceptedFileTypes = [
        "application/pdf",
        "text/csv",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const validFiles = files.filter(
        (file) =>
          acceptedFileTypes.includes(file.type) && file.size <= 10 * 1024 * 1024
      );

      if (validFiles.length < files.length) {
        alert(
          "Some files are invalid. Please upload files up to 10MB of accepted types."
        );
      }

      const blobUrls = validFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        file,
      }));

      let event = { target: { name: key_name, files: validFiles } };
      // handle(event);
      setSelectedFiles((prevFiles) => [...prevFiles, ...blobUrls]);
    };

    fileInput.click();
  };

  const handleDeleteFile = (fileName) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };
  const mimeToLabel = {
    "application/pdf": "PDF",
    "text/csv": "CSV",
    "application/msword": "Word",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "Word",
  };

  const fileDetails = selectedFiles.map(({ file }) => {
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf("."));
    return {
      file: file,
      name: nameWithoutExt,
      type: mimeToLabel[file.type] || "Unknown File Type", // Shorten MIME type
      size: (file.size / 1024).toFixed(2) + " KB", // Convert bytes to KB
    };
  });

  useEffect(() => {
    if (props?.[key_name]) {
      const initialFiles = Array.isArray(props?.[key_name])
        ? props?.[key_name].map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
            file,
          }))
        : [];
      setSelectedFiles(initialFiles);
    }
  }, [props?.[key_name]]);
  return (
    <div className="mb-2">
      <label className="f-12">{label}</label>
      <div
        onClick={handleFileClick}
        className="border-2 border-dashed border-[#00F2DB] bg-[#02F2D80D] rounded-lg p-3"
      >
        <p className="text-[#00F2DB] f-12 cursor-pointer flex justify-center gap-2 align-items-center mb-2">
          <TbUpload /> Upload {selectedFiles.length === 0 ? "" : "more"}{" "}
          Documents
        </p>
        <div className="box mt-2">
          {selectedFiles.length !== 0 && (
            <p className="f-12 flex justify-center gap-2 align-items-center mb-2">
              {selectedFiles.length} documents Selected
            </p>
          )}
          {selectedFiles.length === 0 && (
            <small className="block text-[#08080899] text-center">
              max up to 10MB and pdf, csv, doc, or docx
            </small>
          )}
        </div>
      </div>
      {resolution && (
        <small className="Montserrat">Resolution: {resolution}</small>
      )}

      <div>
        <table className="w-full border-collapse">
          <tbody>
            {fileDetails.map((item, index) => (
              <tr key={index} className="border-b-2">
                <td className="p-2 max-w-32 text-ellipsis overflow-hidden">
                  <small>
                    {index + 1}.{item.name}
                  </small>
                </td>
                <td className="p-2">
                  <small>{item.type}</small>
                </td>
                <td className="p-2">
                  <small>{item.size}</small>
                </td>
                <td className="p-2 text-red-500 cursor-pointer">
                  <small onClick={() => handleDeleteFile(item.file.name)}>
                    Remove
                  </small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
