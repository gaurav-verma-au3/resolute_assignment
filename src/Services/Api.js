import { db } from "../firebse";
import { handleNotification } from "../utils";

export const login = (email, password, enqueueSnackbar, setUser) => {
  const admin = db.collection("admin");
  admin
    .where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let user = doc.data();
        if (user.password === password) {
          delete user.password;
          setUser({ ...user, isSuperAdmin: true, id: doc.id });
          handleNotification(
            enqueueSnackbar,
            "Logged In Succesfully",
            "success"
          );
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, isSuperAdmin: true, id: doc.id })
          );
        } else {
          handleNotification(enqueueSnackbar, "Wrong Password", "error");
        }
      });
    })
    .catch(function (error) {
      handleNotification(enqueueSnackbar, "Server Error !!!", "error");

      console.log("Error getting documents: ", error);
    });
};

export const register = (enqueueSnackbar, formData, setForm) => {
  const admin = db.collection("admin");
  let body = { ...formData, isAdmin: true };
  delete body.confirmPassword;
  admin
    .add(body)
    .then((data) => {
      if (data.id) {
        handleNotification(
          enqueueSnackbar,
          "Registered Successfully",
          "success"
        );
        setForm("login");
      }
    })
    .catch((error) => {
      handleNotification(enqueueSnackbar, "Registration Failed", "error");
      console.error("Error registering: ", error);
    });
};

export const submitUser = (enqueueSnackbar, formData, setSuccess) => {
  const { id } = JSON.parse(localStorage.getItem("user"));

  const clients = db.collection("clients");
  clients
    .doc(id)
    .set({
      ...formData,
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
};

export const userLogin = (
  username,
  password,
  enqueueSnackbar,
  setUser,
  type
) => {
  console.log(username, password);
  const usernameKey = type === "ADMIN" ? "adminUserName" : "managementUserName";
  const passwordKey = type === "ADMIN" ? "adminPassword" : "managementPassword";
  const clients = db.collection("clients");
  clients
    .where(usernameKey, "==", username)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let user = doc.data();
        if (user[passwordKey] === password) {
          if (type === "ADMIN") {
            delete user.adminPassword;
            delete user.managementUserName;
            delete user.managementPassword;
          } else {
            delete user.adminPassword;
            delete user.managementPassword;
            delete user.adminUserName;
          }
          setUser({ ...user, id: doc.id });
          handleNotification(
            enqueueSnackbar,
            `Logged In As ${type}`,
            "success"
          );
          localStorage.setItem("user", JSON.stringify({ ...user, id: doc.id }));
          console.log(user);
        } else {
          handleNotification(enqueueSnackbar, `Wrong Crediantials`, "error");
        }
      });
    })
    .catch(function (error) {
      handleNotification(enqueueSnackbar, "Server Error !!!", "error");

      console.log("Error getting documents: ", error);
    });
};
