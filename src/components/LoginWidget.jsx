import React, { Fragment } from "react";

import TextField from "@atlaskit/textfield";
import Button, { ButtonGroup } from "@atlaskit/button";
import { Checkbox } from "@atlaskit/checkbox";
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage
} from "@atlaskit/form";
import axios from "axios";
import { Translate } from "react-localize-redux";
import styled from "styled-components";

const Link = styled.p`
  color: #0052cc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const LoginSignUpView = ({
  isShowingLogin,
  showLogin,
  showSignUp,
  login,
  authenticate,
  showConsent
}) => {
  return (
    <React.Fragment>
      {isShowingLogin ? (
        <LoginForm
          showSignUp={showSignUp}
          login={login}
          authenticate={authenticate}
        />
      ) : (
        <SignUpForm
          authenticate={authenticate}
          showLogin={showLogin}
          login={login}
          showConsent={showConsent}
        />
      )}
    </React.Fragment>
  );
};

const LoginForm = ({ showSignUp, authenticate }) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "50%"
        }}
      >
        <h1>
          <Translate id={"sign-in-title"} />
        </h1>
        <div
          style={{
            display: "flex",
            width: "400px",
            maxWidth: "100%",
            margin: "0 auto",
            flexDirection: "column"
          }}
        >
          <Form
            onSubmit={data => {
              return authenticate(data.username, data.password);
            }}
          >
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <Field
                  name="username"
                  label={<Translate id={"username-label"} />}
                  isRequired
                  defaultValue=""
                >
                  {({ fieldProps }) => (
                    <TextField autoComplete="off" {...fieldProps} />
                  )}
                </Field>
                <Field
                  name="password"
                  label={<Translate id={"password-label"} />}
                  isRequired
                  defaultValue=""
                >
                  {({ fieldProps }) => (
                    <TextField
                      type="password"
                      autoComplete="off"
                      {...fieldProps}
                    />
                  )}
                </Field>
                <FormFooter>
                  <ButtonGroup>
                    <Button
                      type="submit"
                      appearance="primary"
                      isLoading={submitting}
                    >
                      <Translate id={"login"} />
                    </Button>
                  </ButtonGroup>
                </FormFooter>
              </form>
            )}
          </Form>
        </div>
      </div>
      <p>
        <Translate id={"dont-have-account"} />
      </p>
      <Button type="submit" appearance="link" onClick={e => showSignUp()}>
        <Translate id={"sign-up-btn"} />
      </Button>
    </React.Fragment>
  );
};

const SignUpForm = ({ showLogin, authenticate, showConsent }) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "60%"
        }}
      >
        <h1>
          <Translate id={"sign-up"} />
        </h1>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h6 style={{ display: "flex", color: "red" }}>
            <Translate id={"prompt-consent"} />
          </h6>
          <Link onClick={() => showConsent()}>
            <Translate id={"link-info-consent"} />
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            width: "400px",
            maxWidth: "100%",
            margin: "0 auto",
            flexDirection: "column"
          }}
        >
          <Form
            onSubmit={data => {
              return axios
                .post("/user/create", {
                  userName: data.username,
                  password: data.password
                })
                .then(() => {
                  authenticate(data.username, data.password);
                })
                .catch(() => {
                  return { username: "IN_USE" };
                });
            }}
          >
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <Field
                  name="username"
                  label={<Translate id={"username-label"} />}
                  isRequired
                  defaultValue=""
                >
                  {({ fieldProps, error }) => (
                    <Fragment>
                      <TextField autoComplete="off" {...fieldProps} />
                      {!error && (
                        <HelperMessage>
                          <Translate id={"username-hint"} />
                        </HelperMessage>
                      )}
                      {error && (
                        <ErrorMessage>
                          <Translate id={"username-error"} />
                        </ErrorMessage>
                      )}
                    </Fragment>
                  )}
                </Field>
                <Field
                  name="password"
                  label={<Translate id={"password-label"} />}
                  isRequired
                  defaultValue=""
                  validate={value =>
                    value.length < 8 ? "TOO_SHORT" : undefined
                  }
                >
                  {({ fieldProps, error, valid }) => (
                    <Fragment>
                      <TextField type="password" {...fieldProps} />
                      {!error && !valid && (
                        <HelperMessage>
                          <Translate id={"password-hint"} />
                        </HelperMessage>
                      )}
                      {error && (
                        <ErrorMessage>
                          <Translate id={"password-error"} />
                        </ErrorMessage>
                      )}
                      {valid && (
                        <ValidMessage>
                          <Translate id={"password-valid"} />
                        </ValidMessage>
                      )}
                    </Fragment>
                  )}
                </Field>
                <CheckboxField
                  name="information-consent"
                  label={<Translate id="info-consent" />}
                >
                  {({ fieldProps }) => (
                    <Checkbox
                      {...fieldProps}
                      isRequired
                      label={<Translate id={"consent"} />}
                    />
                  )}
                </CheckboxField>
                <FormFooter>
                  <ButtonGroup>
                    <Button
                      type="submit"
                      appearance="primary"
                      isLoading={submitting}
                    >
                      <Translate id={"sign-up-btn"} />
                    </Button>
                  </ButtonGroup>
                </FormFooter>
              </form>
            )}
          </Form>
        </div>
      </div>
      <p>
        <Translate id={"already-have-account"} />
      </p>
      <Button type="submit" appearance="link" onClick={e => showLogin()}>
        <Translate id={"login"} />
      </Button>
    </React.Fragment>
  );
};
