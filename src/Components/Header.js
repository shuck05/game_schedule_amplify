import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import "./styles/Header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";

function Header(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("UseEffect Header");
    Auth.currentUserInfo()
      .then((user) => {
        if (user !== null && user !== undefined) {
          setCurrentUser(user.attributes.email);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
    // eslint-disable-next-line
  }, []);

  function logout() {
    props.setActiveEvent(null);
    Auth.signOut().then(navigate("/login"));
  }

  function home() {
    props.setNewEntry(false);
    props.setActiveEvent(null);
  }

  async function settings() {
    alert("settings");
    const myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL
      body: {
        name: "Volleyball",
        Users: ["basti-huc@t-online.de"],
      },
    };
    await API.post("gamescheduleLambdaApi", "/createEvent", myInit);
  }
  /*
  async function test() {

    const ev = {
      name: "SchoschEvent",
      Teams: [
        { name: "Greeen", score: 42, playedGames: 187, dif: 23 },
        { name: "Blue", score: 7, playedGames: 187, dif: 420 },
      ],
      Games: [
        {
          team1: "Greeen",
          team2: "Blue",
          scoreT1: 5,
          scoreT2: 1,
          done: true,
        },
        {
          team1: "Blue",
          team2: "Greeen",
          scoreT1: 0,
          scoreT2: 0,
          done: false,
        },
      ],
      Users: ["basti-huck@t-online.de", "qec44123@boofx.com", "admin@123.de"],
    };

    const newEv = await API.graphql({
      query: createEvent,
      variables: { input: ev },
    });
    console.log("Finished " + newEv);


    const dummys = await API.graphql({query: listDummyTypes});
    console.log(dummys)
  }
*/
  return (
    <div className="Background">
      <h2 onClick={home}>Spielplan Schosch</h2>
      <h4>{currentUser}</h4>
      <div className="Button-Row">
        <IconButton onClick={settings}>
          <SettingsIcon sx={{ color: "white" }}></SettingsIcon>
        </IconButton>
        <IconButton onClick={logout}>
          <LogoutIcon sx={{ color: "white" }}></LogoutIcon>
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
