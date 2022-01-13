import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./styles/Login.css";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export default function NewAccPage(props) {
  const [confirm, setConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  function handleUsernameTextfieldChange(e) {
    if (!confirm) setUsername(e.target.value);
  }

  function handlePasswordTextfieldChange(e) {
    if (!confirm) setPassword(e.target.value);
  }

  function handlePasswordCheckTextfieldChange(e) {
    if (!confirm) setPasswordCheck(e.target.value);
  }

  function handleCodeTextfieldChange(e) {
    setCode(e.target.value);
  }

  function handleCreateAccount() {
    if (password !== passwordCheck) {
      alert("Die Passwörter stimmen nicht überein!");
      return;
    }
    Auth.signUp(username, password)
      .then((response) => {
        console.log(response.user);
        if (response.user.username === username) setConfirm(true);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  function handleResendConformationCode() {
    Auth.resendSignUp(username).then(alert("Code erneut gesendet"));
  }

  function confirmAcc() {
    Auth.confirmSignUp(username, code)
      .then(() => {
        navigate("/login");
        alert("Account erfolgreich erstellt!");
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  return (
    <div className="background">
      <div className="center" style={{ minWidth: "20vw" }}>
        <h1>Creating an Account</h1>
        <TextField
          className="loginContent"
          label="E-Mail"
          onChange={handleUsernameTextfieldChange}
        ></TextField>
        <TextField
          className="loginContent"
          label="Password"
          type="password"
          onChange={handlePasswordTextfieldChange}
        ></TextField>
        <TextField
          className="loginContent"
          label="Confirm Password"
          type="password"
          onChange={handlePasswordCheckTextfieldChange}
        ></TextField>
        {confirm ? (
          <div className="center" style={{ minWidth: "20vw" }}>
            <Button
              className="loginContent"
              variant="outlined"
              onClick={handleResendConformationCode}
            >
              Resend Confirmation
            </Button>
            <TextField
              className="loginContent"
              label="Confirmation Code"
              onChange={handleCodeTextfieldChange}
            ></TextField>

            <Button
              className="loginContent"
              variant="outlined"
              onClick={confirmAcc}
            >
              Confirm Account
            </Button>
          </div>
        ) : (
          <div className="center" style={{ minWidth: "20vw" }}>
            <Button
              className="loginContent"
              variant="outlined"
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
