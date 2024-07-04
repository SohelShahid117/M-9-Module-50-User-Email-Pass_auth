import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import auth from "../../Firebase/Firebase.config";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerErr, setRegisterErr] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("handleRegister is working");
    const email = e.target.email.value;
    console.log(email);
    const password = e.target.password.value;
    console.log(password);
    const name = e.target.username.value;
    console.log(name);
    const checked = e.target.terms.checked;
    console.log(checked);
    if (password.length < 6) {
      return setRegisterErr("password should be >=6 character");
    } else if (!/[A-Z]/.test(password)) {
      return setRegisterErr("at least one uppercase character");
    } else if (!checked) {
      return setRegisterErr("accept our terms & conditions");
    }
    setRegisterErr("");
    setSuccess("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed up
        // const user = userCredential.user;
        // ...
        console.log(result.user);
        setSuccess("registration success.");
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
          alert("check your email");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
        setRegisterErr(error.message);
      });
  };
  return (
    <div>
      <h2>Pls register</h2>
      <form action="" onSubmit={handleRegister}>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            name="email"
            placeholder="Email"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            name="username"
            placeholder="Username"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          {/* <input type="password" className="grow" name="password" /> */}
          <input
            type={showPassword ? "text" : "password"}
            className="grow"
            name="password"
          />
          <button
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {/* Show */}
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </label>
        <input type="checkbox" name="terms" id="" />
        <label htmlFor="terms">Accept our terms & conditions</label> <br />
        <input
          type="submit"
          value="Submit Register"
          className="btn btn-primary"
        />
      </form>
      <p>
        already have an account ? go to <Link to="/login">Login</Link>{" "}
      </p>
      {registerErr && <h2 className="text-red-700">{registerErr}</h2>}
      {success && <h1 className="text-green-600">{success}</h1>}
    </div>
  );
};

export default Register;
