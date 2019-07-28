import styled from "styled-components";

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const DescriptionFormWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex-grow: 1;
  max-width: 40%;
  linebreak: strict;
  overflowwrap: break-word;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 600px;
`;

export const Divider = styled.div`
  height: 1px;
  margin-bottom: 2%;
  margin-top: 2%;
  background-color: #e7ebf3;
`;
