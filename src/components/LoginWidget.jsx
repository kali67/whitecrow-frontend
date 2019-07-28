import React, { Fragment } from "react";

import TextField from "@atlaskit/textfield";
import Button, { ButtonGroup } from "@atlaskit/button";
import Form, { Field, FormFooter, HelperMessage, ErrorMessage, ValidMessage } from "@atlaskit/form";
import axios from "axios";

export const LoginSignUpView = ({ isShowingLogin, showLogin, showSignUp, login, authenticate }) => {
  return (
    <React.Fragment>
      {isShowingLogin ? (
        <LoginForm showSignUp={showSignUp} login={login} authenticate={authenticate} />
      ) : (
        <SignUpForm authenticate={authenticate} showLogin={showLogin} login={login} />
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
        }}>
        <h1>SIGN IN TO WHITECROW</h1>
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
                <Field name="username" label="User name" isRequired defaultValue="">
                  {({ fieldProps }) => <TextField autoComplete="off" {...fieldProps} />}
                </Field>
                <Field name="password" label="Password" isRequired defaultValue="">
                  {({ fieldProps }) => (
                    <TextField type="password" autoComplete="off" {...fieldProps} />
                  )}
                </Field>
                <FormFooter>
                  <ButtonGroup>
                    <Button type="submit" appearance="primary" isLoading={submitting}>
                      Login
                    </Button>
                  </ButtonGroup>
                </FormFooter>
              </form>
            )}
          </Form>
        </div>
      </div>
      <p>Don't have an account?</p>
      <Button type="submit" appearance="link" onClick={e => showSignUp()}>
        Sign up
      </Button>
    </React.Fragment>
  );
};

const SignUpForm = ({ showLogin, authenticate }) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "50%"
        }}>
        <h1>SIGN UP TO WHITECROW</h1>
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
                <Field name="username" label="User name" isRequired defaultValue="">
                  {({ fieldProps, error }) => (
                    <Fragment>
                      <TextField autoComplete="off" {...fieldProps} />
                      {!error && (
                        <HelperMessage>You can use letters, numbers & periods.</HelperMessage>
                      )}
                      {error && (
                        <ErrorMessage>
                          This user name is already in use, try another one.
                        </ErrorMessage>
                      )}
                    </Fragment>
                  )}
                </Field>
                <Field
                  name="password"
                  label="Password"
                  isRequired
                  defaultValue=""
                  validate={value => (value.length < 8 ? "TOO_SHORT" : undefined)}>
                  {({ fieldProps, error, valid }) => (
                    <Fragment>
                      <TextField type="password" {...fieldProps} />
                      {!error && !valid && (
                        <HelperMessage>
                          Use 8 or more characters with a mix of letters, numbers & symbols.
                        </HelperMessage>
                      )}
                      {error && (
                        <ErrorMessage>Password needs to be more than 8 characters.</ErrorMessage>
                      )}
                      {valid && <ValidMessage>Awesome password!</ValidMessage>}
                    </Fragment>
                  )}
                </Field>
                <FormFooter>
                  <ButtonGroup>
                    <Button type="submit" appearance="primary" isLoading={submitting}>
                      Sign Up
                    </Button>
                  </ButtonGroup>
                </FormFooter>
              </form>
            )}
          </Form>
        </div>
      </div>
      <p>Already have an account?</p>
      <Button type="submit" appearance="link" onClick={e => showLogin()}>
        Login
      </Button>
    </React.Fragment>
  );
};
