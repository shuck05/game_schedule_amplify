import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "aws-amplify";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameTextfieldChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordTextfieldChange(e) {
    setPassword(e.target.value);
  }

  function handleLogout() {
    Auth.signOut();
  }

  function handleLogin() {
    Auth.signIn(username, password)
      .then((user) => {
        if (user !== null) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  function currentUser() {
    Auth.currentUserInfo()
      .then((user) => {
        if (user !== null) {
          console.log("Logged in as " + user.attributes.email);
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  return (
    <div className="background">
      <div className="center" style={{ minWidth: "20vw" }}>
        <h1>Login for great Sceduling</h1>
        <TextField
          className="loginContent"
          label="Username"
          onChange={handleUsernameTextfieldChange}
        ></TextField>
        <TextField
          className="loginContent"
          label="Password"
          type="password"
          onChange={handlePasswordTextfieldChange}
        ></TextField>
        <Button
          style={{ color: "#61dafb", borderColor: "#61dafb" }}
          className="loginContent"
          variant="outlined"
          onClick={handleLogin}
        >
          Login
        </Button>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            <Link to="/signup" style={{ color: "#61dafb" }}>
              Create Account
            </Link>
          </div>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={currentUser}>CurrentUser</Button>
      </div>
    </div>
  );
}

export default LoginPage;
