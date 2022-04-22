import styled from "styled-components";

export const Button = styled.button`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: large;
  color: white;
  background-color: #3c3c3c;
  padding: 10px 40px;
  border-radius: 12px;
  border: 1px solid #3c3c3c;

  &:hover {
    background-color: #f3f3f3;
    color: #3c3c3c;
    cursor: pointer;
  }

  &:disabled {
    background-color: #f3f3f3;
    color: #3c3c3c;
    cursor: not-allowed;
  }
`;
