import React from "react";
import { Route, useHistory } from "react-router-dom";

import { LoginForm, RegisterForm } from "modules";

import "./Auth.scss";

const Auth = () => {
  const history = useHistory();
  const onSubmit = () => {
    history.push("/profile");
  };
  return (
    <section className="auth">
      <div className="auth__content">
        <Route
          exact
          path={["/", "/signin"]}
          component={() => <LoginForm onSubmit={onSubmit} />}
        />
        <Route
          exact
          path="/signup"
          component={() => <RegisterForm onSubmit={onSubmit} />}
        />
      </div>
    </section>
  );
};

export default Auth;
