import React from "react";
import styled from "styled-components";

const InputComponent = styled.input`
  width: 94%;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
  border: none;
  border-bottom: 1px solid #d8d4d4;
  &:focus {
    outline: none;
  }
`;

const Input = ({ ...props }) => {
  return <InputComponent className="persist" {...props} />;
};

export default Input;
