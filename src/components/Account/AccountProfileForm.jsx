import React from "react";
import styled from "styled-components";
import { gridSize, fontSize } from "@atlaskit/theme";
import InlineEdit from "@atlaskit/inline-edit";
import { Translate } from "react-localize-redux";
import TextField from "@atlaskit/textfield";

import { FormWrapper, SectionWrapper, DescriptionFormWrapper } from "./AccountInfoStyles";

const ReadViewContainer = styled.div`
  display: flex;
  font-size: ${fontSize()}px;
  line-height: ${(gridSize() * 2.5) / fontSize()};
  max-width: 100%;
  min-height: ${(gridSize() * 2.5) / fontSize()}em;
  padding: ${gridSize()}px ${gridSize() - 2}px;
  word-break: break-word;
`;

const AccountProfileForm = ({ username, updateProfile }) => {
  return (
    <SectionWrapper>
      <DescriptionFormWrapper>
        <h6>
          <Translate id="profile" />
        </h6>
        <small>
          <Translate id="profile-description" />
        </small>
      </DescriptionFormWrapper>
      <FormWrapper>
        <InlineEdit
          defaultValue={username}
          label={<Translate id="username" />}
          editView={fieldProps => <TextField {...fieldProps} autoFocus />}
          readView={() => (
            <ReadViewContainer>{username || "Click to enter value"}</ReadViewContainer>
          )}
          onConfirm={value => updateProfile(value)}
        />
      </FormWrapper>
    </SectionWrapper>
  );
};

export default AccountProfileForm;
