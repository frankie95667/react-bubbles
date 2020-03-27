import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Button
} from "@material-ui/core";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const {push} = props.history;

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('token', JSON.stringify(res.data.payload))
        push('/bubble-page')
      })
      .catch(err => console.error(err.message));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <FormControl fullWidth>
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" color="primary" variant="contained">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
