import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  FormControl,
  withStyles,
} from "@material-ui/core";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import VpnKey from "@material-ui/icons/VpnKey";
import { validateLoginForm } from "../../utils";
import { login, userLogin } from "../../Services/Api";
import { useSnackbar } from "notistack";
import { db } from "../../firebse";
export const formStyles = {
  root: {
    background: "transparent",
    width: "90%",
  },
  input: {
    color: "#161718",
  },
  cssLabel: {
    color: "#161718",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `#161718`,
    },
    color: "#161718",
  },

  cssFocused: {
    color: "#161718",
  },

  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#161718 !important",
  },
};

const Login = ({ classes, setUser }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loginType, setLoginType] = useState("SUPER ADMIN");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const resetError = () => {
    setError({
      email: "",
      password: "",
    });
  };
  const handleLogin = (e) => {
    console.log(loginType);
    e.preventDefault();
    if (loginType === "SUPER ADMIN") {
      let valid = validateLoginForm(e, setError);
      if (valid) {
        login(
          e.target.email.value,
          e.target.password.value,
          enqueueSnackbar,
          setUser
        );
      }
    } else {
      console.log("loggin in as " + loginType);
      console.log(e.target.email.value, e.target.password.value);
      userLogin(
        e.target.email.value,
        e.target.password.value,
        enqueueSnackbar,
        setUser,
        loginType
      );
    }
  };
  return (
    <div className="container-fluid  border border-sm w-75 rounded">
      <div className="row">
        <div className="col-12 text-center my-2">
          <h4>{loginType + " Login"} </h4>
        </div>
        <div className="col-12 text-center  ">
          <form
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <FormControl>
              <div className="col-12 text-center my-2">
                <TextField
                  variant="outlined"
                  onChange={(e) => resetError()}
                  error={error.email.length ? true : false}
                  helperText={error.email}
                  className={`w-100 my-2 ${classes.root}`}
                  label="Email"
                  name="email"
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <AlternateEmail />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  onChange={(e) => resetError()}
                  error={error.password.length ? true : false}
                  helperText={error.password}
                  type="password"
                  name="password"
                  variant="outlined"
                  className={`w-100 my-2 ${classes.root}`}
                  label="Password"
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <VpnKey />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="current-password"
                />
              </div>

              <div className="col-12 text-right my-2">
                <h6>Forgot Password?</h6>
              </div>
              <div className="col-12 text-center my-2">
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  style={{
                    border: "2px solid white",
                    color: "#f2f3f4",
                    background: "rgba(220, 53, 69, 0.9)",
                  }}
                  className="w-100"
                  type="submit"
                >
                  LOGIN
                </Button>
              </div>
              <div className="col-12 text-center my-2">
                {loginType === "ADMIN" ? (
                  <Button
                    variant="outlined"
                    size="large"
                    color="secondary"
                    style={{
                      border: "2px solid white",
                      color: "#f2f3f4",
                      background: "rgba(220, 53, 69, 0.9)",
                    }}
                    className="w-100"
                    onClick={(e) => setLoginType("SUPER ADMIN")}
                  >
                    LOGIN AS SUPER ADMIN
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="large"
                    color="secondary"
                    style={{
                      border: "2px solid white",
                      color: "#f2f3f4",
                      background: "rgba(220, 53, 69, 0.9)",
                    }}
                    className="w-100"
                    onClick={(e) => setLoginType("ADMIN")}
                  >
                    LOGIN AS ADMIN
                  </Button>
                )}
              </div>
              <div className="col-12 text-center my-2">
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  style={{
                    border: "2px solid white",
                    color: "#f2f3f4",
                    background: "rgba(220, 53, 69, 0.9)",
                  }}
                  onClick={(e) => setLoginType("MANAGER")}
                  className="w-100"
                >
                  LOGIN AS MANAGER
                </Button>
              </div>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withStyles(formStyles)(Login);
