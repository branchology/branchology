import { Button } from '@blueprintjs/core';
import { Formik, Form } from 'formik';
import React from 'react';
import { components } from 'module/common';
import { UserContext } from '../UserContext';
import { useCreateToken } from '../mutation/useCreateToken';

const {
  ui: {
    Form: { InputText },
  },
} = components;

const Login = () => {
  const [createToken] = useCreateToken();

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <UserContext.Consumer>
      {({ setUser }) => (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            return createToken(values)
              .then(({ errors, token }) => {
                if (errors) {
                  setSubmitting(false);
                  setErrors(errors);
                } else {
                  setUser(token);
                }
              })
              .catch(e => {
                setSubmitting(false);
              });
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form>
              <InputText name="email" label="Email Address" autoFocus />
              <InputText name="password" type="password" label="Password" />
              <Button
                intent="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </UserContext.Consumer>
  );
};

export default Login;
