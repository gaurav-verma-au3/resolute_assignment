export const handleNotification = (enqueueSnackbar, message, variant) => {
  // variant could be success, error, warning, info, or default
  enqueueSnackbar(message, { variant });
};

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const validateForm = (setError, formData, setFormData) => {
  let valid = true;
  let error = { email: "", name: "", password: "", confirmPassword: "" };
  Object.keys(formData).forEach((name) => {
    let value = formData[name];
    switch (name) {
      case "name":
        error.name =
          value.length < 2 ? "Name must be atleast 2 characters long" : "";
        break;

      case "email":
        error.email = validEmailRegex.test(value) ? "" : "Email is not Valid";
        break;
      case "password":
        error.password =
          value.length < 8 ? "Password must be 8 characters long" : "";
        break;
      case "confirmPassword":
        error.confirmPassword =
          value === formData.password ? "" : "Passwords don't match";
        break;

      default:
        break;
    }
  });
  Object.values(error).forEach((val) => val.length && (valid = false));
  if (valid) {
    return valid;
  } else {
    if (error.password.length || error.confirmPassword.length) {
      setFormData({ ...formData, password: "", confirmPassword: "" });
    }
    setError(error);
    return valid;
  }
};

export const validateLoginForm = (e, setError) => {
  let valid = true;
  let error = { email: "", password: "" };
  Object.keys(error).forEach((name) => {
    let { value } = e.target[name];
    switch (name) {
      case "email":
        if (!value.length) {
          error.email = "Please enter a valid Email";
        } else {
          error.email = validEmailRegex.test(value)
            ? ""
            : "Please enter a valid Email";
        }
        break;
      case "password":
        error.password =
          value.length < 8 ? "Password must be 8 characters long" : "";
        break;

      default:
        break;
    }
  });
  Object.values(error).forEach((val) => val.length && (valid = false));
  if (valid) {
    return valid;
  } else {
    setError(error);
    return valid;
  }
};
