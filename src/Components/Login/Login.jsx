import React, { useRef, useState } from "react";
import auth from "../../Firebase/Firebase.config";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerErr, setRegisterErr] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    const password = e.target.password.value;
    console.log(password);
    setSuccess("");
    setRegisterErr("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        console.log(result.user);
        setSuccess("login success.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setRegisterErr(error.message);
      });
  };
  const handleForgetPassword = (e) => {
    console.log("handleForgetPassword is working", emailRef.current);
    const email = emailRef.current.value;
    if (!email) {
      console.log("pls enter your email address ", email);
      return;
    } else if (
      !/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
        email
      )
    ) {
      console.log("type proper email address");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("pls check your email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
      });
  };
  return (
    <div>
      <h2>Pls login</h2>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a
                    onClick={handleForgetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <p>
              do u have new in website? pls <Link to="/register">Register</Link>{" "}
            </p>
            {registerErr && <h2 className="text-red-700">{registerErr}</h2>}
            {success && <h1 className="text-green-600">{success}</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
