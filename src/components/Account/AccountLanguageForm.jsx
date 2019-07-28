import React from "react";
import Select from "@atlaskit/select";
import { Translate } from "react-localize-redux";
import Button from "@atlaskit/button";
import Form, { Field, FormFooter } from "@atlaskit/form";
import { FormWrapper, SectionWrapper, DescriptionFormWrapper } from "./AccountInfoStyles";

const AccountLanguageForm = ({ currentLanguage, saveLanguage, languages }) => {
  return (
    <SectionWrapper>
      <DescriptionFormWrapper>
        <h6>
          <Translate id="language-title" />
        </h6>
        <small>
          <Translate id="language-description" />
        </small>
      </DescriptionFormWrapper>
      <FormWrapper>
        <Form
          onSubmit={data => {
            saveLanguage(data.language.value);
          }}>
          {({ formProps, submitting }) => (
            <form {...formProps}>
              <Field
                name="language"
                label="Language"
                defaultValue={{ label: currentLanguage.name, value: currentLanguage.code }}>
                {({ fieldProps, error }) => (
                  <Select
                    options={languages.map(x => {
                      return { label: x.name, value: x.code };
                    })}
                    placeholder={<Translate id="language" />}
                    {...fieldProps}
                  />
                )}
              </Field>
              <FormFooter>
                <Button type="submit" appearance="warning" isloading={submitting}>
                  <Translate id="update-language" />
                </Button>
              </FormFooter>
            </form>
          )}
        </Form>
      </FormWrapper>
    </SectionWrapper>
  );
};

export default AccountLanguageForm;
