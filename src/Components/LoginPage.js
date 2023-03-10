import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Images/logo2.png";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center ">
        <Link to={"/"} className="link">
          <div className="my-2">
            <img src={logo} alt="logo" style={{ width: "100px" }} />
          </div>
        </Link>
        <div className="form p-4 d-flex flex-column bg-white">
          <span className=" fs-3 text-start m-3 d-block">Sign In</span>
          <label htmlFor="email" className="fw-bold">
            E-mail
          </label>
          <input
            type={"email"}
            id="email"
            className="search"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="fw-bold">
            Password
          </label>
          <input
            type={"password"}
            id="password"
            className="search"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error === "Firebase: Error (auth/user-not-found)." ? (
            <span className="text-danger text-center">User Not Found</span>
          ) : null}
          {error === "Firebase: Error (auth/wrong-password)." ? (
            <span className="text-danger text-center">Wrong Password</span>
          ) : null}
          {error === "Firebase: Error (auth/email-already-in-use)." ? (
            <span className="text-danger text-center">
              Email Already Exist Sign In Now
            </span>
          ) : null}
          {error ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)." ? (
            <span className="text-danger text-center">
              Password should be at least 6 characters
            </span>
          ) : null}
          <Button variant="warning" className="my-3" onClick={signIn}>
            Sign In
          </Button>
          <span className="font-small">
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </span>
          <button className="but1 my-3" onClick={register}>
            Create Your Amazon Account
          </button>
        </div>
      </Container>
    </>
  );
}

export default LoginPage;
