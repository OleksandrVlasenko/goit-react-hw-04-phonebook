import styled from "@emotion/styled"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  

  width: 300px;

  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 2px solid #05888d;

  & input {
    display: block;
    width: 100%;
  }

  & button {
    width: 100px;
  }
`;