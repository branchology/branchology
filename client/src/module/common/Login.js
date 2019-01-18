import { Formik, Form } from 'formik';
import React from 'react';
import { useToggle } from 'lib';
import { components } from 'module/common';
import createTokenWrapper from './container/createToken';
import { AppContext } from './Context';

const {
  ui: {
    Button,
    Dialog,
    FauxLink,
    Form: { InputText },
  },
} = components;

const Login = ({ createToken }) => {
  const [loginOpen, toggleLogin] = useToggle();

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div>
      Welcome, Guest! <FauxLink onClick={toggleLogin}>Login</FauxLink>
      {loginOpen && (
        <AppContext.Consumer>
          {({ setToken }) => (
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setErrors, setSubmitting }) => {
                return createToken(values)
                  .then(({ data: { createToken: { errors, token } } }) => {
                    if (errors) {
                      setSubmitting(false);
                      setErrors(errors);
                    } else {
                      setToken(token);
                    }
                  })
                  .catch(e => {
                    setSubmitting(false);
                  });
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Dialog
                  title="Log In"
                  onClose={toggleLogin}
                  footer={
                    <div>
                      <Button danger type="button" onClick={toggleLogin}>
                        Close
                      </Button>
                      <Button
                        primary
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        Log In
                      </Button>
                    </div>
                  }
                >
                  <Form>
                    <InputText name="email" label="Email Address" autoFocus />
                    <InputText
                      name="password"
                      type="password"
                      label="Password"
                    />
                  </Form>
                </Dialog>
              )}
            </Formik>
          )}
        </AppContext.Consumer>
      )}
    </div>
  );
};

export default createTokenWrapper(Login);
