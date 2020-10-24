import React, { useState } from "react";
import { formStyles } from "./Login";
import {
  TextField,
  InputAdornment,
  Button,
  FormControl,
  withStyles,
} from "@material-ui/core";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import VpnKey from "@material-ui/icons/VpnKey";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { useSnackbar } from "notistack";
import { validateForm } from "../../utils";
import { register } from "../../Services/Api";
const Register = ({ classes, setForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setError({
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    });
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = await validateForm(setError, formData, setFormData);

    if (valid) {
      register(enqueueSnackbar, formData, setForm);
    }
  };

  return (
    <div className="container-fluid  border border-sm w-75 rounded">
      <div className="row">
        <div className="col-12 text-center my-2">
          <h4>Admin Login</h4>
        </div>
        <div className="col-12 text-center  ">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormControl>
              <div className="col-12 text-center my-2">
                <TextField
                  error={error.name.length ? true : false}
                  helperText={error.name}
                  variant="outlined"
                  label="Full Name"
                  value={formData.name}
                  name="name"
                  className={`my-2 w-100 ${classes.root}`}
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
                        <PermIdentityIcon className="text-dark" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  error={error.email.length ? true : false}
                  helperText={error.email}
                  variant="outlined"
                  value={formData.email}
                  type="email"
                  className={`my-2 w-100 ${classes.root}`}
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
                        <AlternateEmail className="text-dark" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  error={error.password.length ? true : false}
                  helperText={error.password}
                  type="password"
                  name="password"
                  variant="outlined"
                  className={`my-2 w-100 ${classes.root}`}
                  label="Password"
                  value={formData.password}
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
                        <VpnKey className="text-dark" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  error={error.confirmPassword.length ? true : false}
                  helperText={error.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  variant="outlined"
                  className={`my-2 w-100 ${classes.root}`}
                  label="Re Type Password"
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
                  }}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="col-12 my-2">
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  style={{
                    border: "2px solid white",
                    color: "#f2f3f4",
                    background: "rgba(220, 53, 69, 0.9)",
                  }}
                  className="w-100 my-2"
                  type="submit"
                >
                  REGISTER
                </Button>
              </div>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withStyles(formStyles)(Register);
