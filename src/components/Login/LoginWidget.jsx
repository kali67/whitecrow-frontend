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
import Select from "@atlaskit/select/dist/esm/Select";

import globe from "../../static/image/globe.png";

export const LoginSignUpView = ({
  isShowingLogin,
  showLogin,
  showSignUp,
  login,
  authenticate,
  showConsent,
  languages,
  handleLanguageChange,
  activeLanguage
}) => {
  return (
    <React.Fragment>
      {isShowingLogin ? (
        <LoginForm
          showSignUp={showSignUp}
          login={login}
          authenticate={authenticate}
          languages={languages}
          handleLanguageChange={handleLanguageChange}
          activeLanguage={activeLanguage}
        />
      ) : (
        <SignUpForm
          authenticate={authenticate}
          showLogin={showLogin}
          login={login}
          showConsent={showConsent}
          languages={languages}
          handleLanguageChange={handleLanguageChange}
          activeLanguage={activeLanguage}
        />
      )}
    </React.Fragment>
  );
};

const LanguagesSelect = ({ languages, handleLanguageChange, activeLanguage }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        marginRight: "5%"
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <Icon image={globe} />
      </div>
      <div style={{ width: "200px" }}>
        <Select
          options={languages.map(x => {
            return { label: x.name, value: x.code };
          })}
          placeholder={activeLanguage.name}
          onChange={handleLanguageChange}
        />
      </div>
    </div>
  );
};
const LoginForm = ({
  showSignUp,
  authenticate,
  languages,
  handleLanguageChange,
  activeLanguage
}) => {
  return (
    <React.Fragment>
      <LanguagesSelect
        languages={languages}
        handleLanguageChange={handleLanguageChange}
        activeLanguage={activeLanguage}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "50%"
        }}>
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
          }}>
          <Form
            onSubmit={data => {
              return authenticate(data.username, data.password);
            }}>
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <Field
                  name="username"
                  label={<Translate id={"username-label"} />}
                  isRequired
                  defaultValue="">
                  {({ fieldProps }) => <TextField autoComplete="off" {...fieldProps} />}
                </Field>
                <Field
                  name="password"
                  label={<Translate id={"password-label"} />}
                  isRequired
                  defaultValue="">
                  {({ fieldProps, error }) => (
                    <Fragment>
                      <TextField type="password" autoComplete="off" {...fieldProps} />
                      {error && (
                        <ErrorMessage>
                          <Translate id="incorrect-password" />
                        </ErrorMessage>
                      )}
                    </Fragment>
                  )}
                </Field>
                <FormFooter>
                  <ButtonGroup>
                    <Button type="submit" appearance="primary" isLoading={submitting}>
                      <Translate id={"login"} />
                    </Button>
                  </ButtonGroup>
                </FormFooter>
              </form>
            )}
          </Form>
        </div>
      </div>
      <AccountActionFooter>
        <p>
          <Translate id={"dont-have-account"} />
        </p>
        <Button type="submit" appearance="link" onClick={e => showSignUp()}>
          <Translate id={"sign-up-btn"} />
        </Button>
      </AccountActionFooter>
    </React.Fragment>
  );
};

const SignUpForm = ({
  showLogin,
  authenticate,
  showConsent,
  languages,
  handleLanguageChange,
  activeLanguage
}) => {
  return (
    <React.Fragment>
      <LanguagesSelect
        languages={languages}
        handleLanguageChange={handleLanguageChange}
        activeLanguage={activeLanguage}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "60%"
        }}>
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
          }}>
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
          }}>
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
            }}>
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <Field
                  name="username"
                  label={<Translate id={"username-label"} />}
                  isRequired
                  defaultValue="">
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
                  validate={value => (value.length < 8 ? "TOO_SHORT" : undefined)}>
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
                <CheckboxField name="information-consent" label={<Translate id="info-consent" />}>
                  {({ fieldProps }) => (
                    <Checkbox {...fieldProps} isRequired label={<Translate id={"consent"} />} />
                  )}
                </CheckboxField>
                <FormFooter>
                  <ButtonGroup>
                    <Button type="submit" appearance="primary" isLoading={submitting}>
                      <Translate id={"sign-up-btn"} />
                    </Button>
                  </ButtonGroup>
                </FormFooter>
              </form>
            )}
          </Form>
        </div>
      </div>
      <AccountActionFooter>
        <p>
          <Translate id={"already-have-account"} />
        </p>
        <Button type="submit" appearance="link" onClick={e => showLogin()}>
          <Translate id={"login"} />
        </Button>
      </AccountActionFooter>
    </React.Fragment>
  );
};

const AccountActionFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Link = styled.p`
  color: #0052cc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Icon = styled.div`
  background-image: url(${props => props.image});
  height: 40px;
  width: 40px;
  margin-right: 10px;
  background-size: cover;
`;
