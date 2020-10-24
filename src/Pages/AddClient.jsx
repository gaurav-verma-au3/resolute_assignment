import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { TextField } from "@material-ui/core";
import { useState } from "react";
import { submitUser, userLogin } from "../Services/Api";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  inputRoot: {
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
  formBox: {
    margin: "0px 3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "50vh",
  },

  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#161718 !important",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "General Details",
    "Owner Details",
    "Point Of Contact 1",
    "Point Of Contact 2",
    "Login Credientials",
  ];
}

const StepForms = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    email: "",
    phone: "",
    address: "",
    ownerName: "",
    ownerPhone: "",
    ownerAddress: "",
    adminUserName: "",
    adminPassword: "",
    managementUserName: "",
    managementPassword: "",
    pointOfContact: {
      first: { contactPersonName: "", contactPersonPhone: "" },
      second: { contactPersonName: "", contactPersonPhone: "" },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    if (name === "firstContactPersonName") {
      setFormData({
        ...formData,
        pointOfContact: {
          ...formData.pointOfContact,
          first: { ...formData.pointOfContact.first, contactPersonName: value },
        },
      });
    } else if (name === "firstContactPersonPhone") {
      setFormData({
        ...formData,
        pointOfContact: {
          ...formData.pointOfContact,
          first: {
            ...formData.pointOfContact.first,
            contactPersonPhone: value,
          },
        },
      });
    } else if (name === "secondContactPersonName") {
      setFormData({
        ...formData,
        pointOfContact: {
          ...formData.pointOfContact,
          second: {
            ...formData.pointOfContact.second,
            contactPersonName: value,
          },
        },
      });
    } else if (name === "secondContactPersonPhone") {
      setFormData({
        ...formData,
        pointOfContact: {
          ...formData.pointOfContact,
          second: {
            ...formData.pointOfContact.second,
            contactPersonPhone: value,
          },
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    submitUser(enqueueSnackbar, formData, setSuccess);
  };

  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep = isLastStep() ? activeStep : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      {success ? <Redirect to="/client-management" /> : null}
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          {/* <Typography type="h5">{getSteps()[activeStep]}</Typography> */}
          {activeStep === 0 ? (
            <div key={activeStep} className={classes.formBox}>
              <TextField
                onChange={handleChange}
                type="text"
                name="companyName"
                value={formData.companyName}
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Company Name"
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
              />
              <TextField
                type="text"
                name="businessType"
                variant="outlined"
                onChange={handleChange}
                value={formData.businessType}
                className={`my-2 ${classes.inputRoot}`}
                label="Type of Business"
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
              />
              <TextField
                onChange={handleChange}
                value={formData.email}
                type="email"
                name="email"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Email Id"
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
              />
              <TextField
                onChange={handleChange}
                value={formData.phone}
                type="tel"
                name="phone"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Phone Number"
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
              />
              <TextField
                onChange={handleChange}
                value={formData.address}
                type="text"
                name="address"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Address"
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
              />
            </div>
          ) : null}
          {activeStep === 1 ? (
            <div key={activeStep} className={classes.formBox}>
              <TextField
                onChange={handleChange}
                value={formData.ownerName}
                type="text"
                name="ownerName"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Owner Name"
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
              />
              <TextField
                onChange={handleChange}
                value={formData.ownerAddress}
                type="text"
                name="ownerAddress"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Owner Address"
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
              />
              <TextField
                onChange={handleChange}
                value={formData.ownerPhone}
                type="text"
                name="ownerPhone"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Owner Phone"
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
              />
            </div>
          ) : null}
          {activeStep === 2 ? (
            <div key={activeStep} className={classes.formBox}>
              <TextField
                onChange={handleChange}
                value={formData.pointOfContact.first.contactPersonName}
                type="text"
                name="firstContactPersonName"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Contact Person's Name"
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
              />
              <TextField
                onChange={handleChange}
                value={formData.pointOfContact.first.contactPersonPhone}
                type="tel"
                name="firstContactPersonPhone"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Contact Persons's Phone"
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
              />
            </div>
          ) : null}
          {activeStep === 3 ? (
            <div key={activeStep} className={classes.formBox}>
              <TextField
                onChange={handleChange}
                value={formData.pointOfContact.second.contactPersonName}
                type="text"
                name="secondContactPersonName"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Contact Person's Name"
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
              />
              <TextField
                onChange={handleChange}
                value={formData.pointOfContact.second.contactPersonPhone}
                type="tel"
                name="secondContactPersonPhone"
                variant="outlined"
                className={`my-2 ${classes.inputRoot}`}
                label="Contact Persons's Phone"
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
              />
            </div>
          ) : null}
          {activeStep === 4 ? (
            <div key={activeStep} className={classes.formBox}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <Typography>Admin Credientials</Typography>

                  <TextField
                    onChange={handleChange}
                    value={formData.adminUserName}
                    type="text"
                    name="adminUserName"
                    variant="outlined"
                    className={`my-2 ${classes.inputRoot}`}
                    label="Admin Username"
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
                  />
                  <TextField
                    onChange={handleChange}
                    value={formData.adminPassword}
                    type="password"
                    name="adminPassword"
                    variant="outlined"
                    className={`my-2 ${classes.inputRoot}`}
                    label="Admin Password"
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
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <Typography>Management Credientials</Typography>
                  <TextField
                    onChange={handleChange}
                    value={formData.managementUserName}
                    type="text"
                    name="managementUserName"
                    variant="outlined"
                    className={`my-2 ${classes.inputRoot}`}
                    label="Management Username"
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
                  />
                  <TextField
                    onChange={handleChange}
                    value={formData.managementPassword}
                    type="password"
                    name="managementPassword"
                    variant="outlined"
                    className={`my-2 ${classes.inputRoot}`}
                    label="Management Password"
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
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="text-right pr-5">
            <button
              onClick={(e) => userLogin("admin1", "admin1", enqueueSnackbar)}
            >
              Fetch
            </button>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>

            {isLastStep() ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Add Client
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepForms;
