import React from "react";

import { Translate } from "react-localize-redux";
import Button from "@atlaskit/button";
import Form, { Field, FormFooter, HelperMessage, ErrorMessage, ValidMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { SectionWrapper, DescriptionFormWrapper, FormWrapper } from "./AccountInfoStyles";

const AccountPasswordForm = () => {
  return (
    <SectionWrapper>
      <DescriptionFormWrapper>
        <h6>
          <Translate id="password" />
        </h6>
        <small>
          <Translate id="password-description" />
        </small>
      </DescriptionFormWrapper>
      <FormWrapper>
        <Form
          onSubmit={data => {
          }}>
          {({ formProps, submitting }) => (
            <form {...formProps}>
              <Field
                name="oldPassword"
                label={<Translate id="old-password" />}
                isRequired
                defaultValue="">
                {({ fieldProps }) => <TextField autoComplete="off" {...fieldProps} />}
              </Field>
              <Field
                name="newPassword"
                label={<Translate id="new-password" />}
                isRequired
                defaultValue="">
                {({ fieldProps }) => <TextField autoComplete="off" {...fieldProps} />}
              </Field>
              <Field
                name="confirmNewPassword"
                label={<Translate id="confirm-password" />}
                isRequired
                defaultValue="">
                {({ fieldProps }) => (
                  <TextField type="password" autoComplete="off" {...fieldProps} />
                )}
              </Field>
              <FormFooter>
                <Button type="submit" appearance="warning" isloading={submitting}>
                  <Translate id="update-password" />
                </Button>
              </FormFooter>
            </form>
          )}
        </Form>
      </FormWrapper>
    </SectionWrapper>
  );
};

export default AccountPasswordForm;
