import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import { deleteEvent, deleteGame, deleteTeam } from "../graphql/mutations";

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

  async function dummy() {
    const deletedEv = await API.graphql({
      query: deleteEvent,
      variables: { input: { id: "e55851f5-2c0d-427c-947b-e15f5045f1e3" } },
    });
    let gameIDs = [];
    for (let i = 0; i < deletedEv.data.deleteEvent.Games.items.length; i++) {
      gameIDs.push(deletedEv.data.deleteEvent.Games.items[i].id);
      await API.graphql({
        query: deleteGame,
        variables: {
          input: { id: deletedEv.data.deleteEvent.Games.items[i].id },
        },
      });
    }

    let teamIDs = [];
    for (let i = 0; i < deletedEv.data.deleteEvent.Teams.items.length; i++) {
      teamIDs.push(deletedEv.data.deleteEvent.Teams.items[i].id);
      await API.graphql({
        query: deleteTeam,
        variables: {
          input: { id: deletedEv.data.deleteEvent.Teams.items[i].id },
        },
      });
    }

    /*
    const myInit = {
      // OPTIONAL
      //      headers: {
      //        "Access-Control-Allow-Origin": "*",
      //        "Access-Control-Allow-Headers": "*",
      //      }, // OPTIONAL
      body: {
        name: "Abridged",
        Users: ["basti-huck@t-online.de"],
        teams: ["Yugi", "Koiba", "Duke"],
        games: [
          { team1: "Koiba", team2: "Yugi" },
          { team1: "Duke", team2: "Koiba" },
          { team1: "Duke", team2: "Yugi" },
        ],
      },
      
    };

    const file = await API.post("gamescheduleLambdaApi", "/createEvent", myInit)
      .then(console.log("Succes"))
      .catch(() => {
        console.log("An Error occoured");
      });
    console.log(file);
    */
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
        <Button onClick={dummy}>Dummy</Button>
      </div>
    </div>
  );
}

export default LoginPage;
