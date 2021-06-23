import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Paper, Grid, Typography, Container, Button } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";

import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import useStyles from "./styles";
import Input from "./input";
import Icon from "./icon";
import { signUp, signIn } from "../../api/auth";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      signUp(formData, history);
    } else {
      signIn(formData, history);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      localStorage.setItem("profile", JSON.stringify({ result, token }));

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google auth failed. Please try again");
  };

  const Name = isSignUp ? (
    <>
      <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
      <Input name="lastName" label="Last Name" handleChange={handleChange} half />
    </>
  ) : null;

  const repeatPassword = isSignUp ? <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> : null;

  const signUpText = isSignUp ? "Sign Up" : "Sign In";
  return (
    <Container className={classes.main} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{signUpText}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Name}
            <Input
              name="email"
              label="Email Address"
              handleChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              value={email}
            />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {repeatPassword}
          </Grid>
          <Button type="submit" color="primary" className={classes.submit} fullWidth variant="contained">
            {signUpText}
          </Button>
          <GoogleLogin
            clientId="803520660733-4k0o0ab87rva1kq77hchuse65gv1dg6i.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
