import React from "react";
import styled from "styled-components";

const InputComponent = styled.input`
  border: 1px solid #b2b2b2;
  padding: 10px;
  width: 100%;
`;

const Input = ({ ...props }) => {
  return <InputComponent className="persist" {...props} />;
};

export default Input;
