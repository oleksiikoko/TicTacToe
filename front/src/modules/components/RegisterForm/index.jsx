import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { userActions } from "redux/actions";
import store from "redux/store";

const RegisterForm = onSubmit => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("firstName :", firstName);
    console.log("lastName :", lastName);
    console.log("email :", email);
    console.log("username :", username);
    console.log("password :", password);

    store
      .dispatch(
        userActions.fetchUserSignup({
          firstName,
          lastName,
          email,
          username,
          password
        })
      )
      .then(status => {
        if (status === "success") {
          onSubmit();
        }
      })
      .catch(err => {
        console.log("err :", err);
      });
  };

  return (
    <Card className="auth__content-card">
      <h2>Sign up</h2>
      <CardContent>
        <form noValidate autoComplete="off">
          <div>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccessibilityIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="First name"
                  name="first_name"
                  onChange={e => setFirstName(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccessibilityIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Last name"
                  name="last_name"
                  onChange={e => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="E-mail"
                  name="email"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircleIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Login"
                  name="login"
                  onChange={e => setUsername(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <LockIcon />
              </Grid>
              <Grid>
                <TextField
                  id="input-with-icon-grid"
                  type="password"
                  label="Password"
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Button
              onClick={handleSubmit}
              className="submit-btn"
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
          </div>
          <div>
            <Link href="" to="/signin">
              <Button className="change-sign-btn">Sign in</Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
