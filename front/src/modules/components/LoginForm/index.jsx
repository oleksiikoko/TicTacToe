import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const LoginForm = () => {
  return (
    <Card className="auth__content-card">
      <h2>Sign in</h2>
      <CardContent>
        <form noValidate autoComplete="off">
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
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Button className="submit-btn" variant="contained" color="primary">
              Sign in
            </Button>
          </div>
          <div>
            <Link href="" to="/signup">
              <Button className="change-sign-btn">Sign up</Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
