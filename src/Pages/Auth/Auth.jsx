import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
const Auth = ({ setUser }) => {
  const [form, setForm] = useState("login");

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col-sm-12 col-xs-12 col-md-9 col-lg-9 h-100 p-0">
          <img
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            src="https://i.ibb.co/bmdg9Q0/brooke-cagle-HRZUzo-X1e6w-unsplash.jpg"
            alt="brooke-cagle-HRZUzo-X1e6w-unsplash"
          ></img>
        </div>
        <div className="col-sm-12 col-xs-12 col-md-3 col-lg-3 h-100 p-0 d-flex align-items-center justify-content-center">
          <div className="h-75 d-flex flex-column justify-content-around">
            <div className="text-center">
              <h1>FaceGenie</h1>
              <h5>Super Admin Panel</h5>
            </div>
            {form === "login" ? (
              <Login setUser={setUser} />
            ) : (
              <Register setForm={setForm} />
            )}
            {form === "login" ? (
              <>
                <h6 className="text-center">
                  Don't have an accout?{" "}
                  <span
                    className="text-danger cursor-pointer"
                    onClick={(e) => setForm("register")}
                  >
                    Click here
                  </span>{" "}
                  to SignUp
                </h6>
              </>
            ) : (
              <>
                <h6 className="text-center">
                  Already Registered?{" "}
                  <span
                    className="text-danger cursor-pointer"
                    onClick={(e) =>
                      setForm(form === "login" ? "register" : "login")
                    }
                  >
                    Go to
                  </span>{" "}
                  Login
                </h6>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
