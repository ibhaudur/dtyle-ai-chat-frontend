import React from "react";

const CustomInput = ({ label, type, placeholder }) => {
  return (
    <div className="mb-2">
      <label className="f-12">{label}</label>
      <input className="input-form" type={type} placeholder={placeholder} />
    </div>
  );
};

export default CustomInput;
