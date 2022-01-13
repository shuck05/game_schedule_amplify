import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import "./styles/Schedule.css";
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { updateGame, updateTeam } from "../graphql/mutations";

function Schedule(props) {
  const [activeEdit, setActiveEdit] = useState("");
  const [textfield1, setTextfield1] = useState(0);
  const [textfield2, setTextfield2] = useState(0);

  useEffect(() => {
    console.log("Schedule useEffect");
    //eslint-disable-next-line
  }, []);

  function handleTF1change(e) {
    setTextfield1(e.target.value);
  }

  function handleTF2change(e) {
    setTextfield2(e.target.value);
  }

  function comp(team1, team2) {
    if (team1.score > team2.score) return -1;
    if (team1.score < team2.score) return 1;
    if (team1.difference > team2.difference) return -1;
    if (team1.difference < team2.difference) return 1;
    return 0;
  }

  async function addResult(team1, team2) {
    let gamesArr = props.activeEvent.Games.items;

    let indexT1 = null;
    let indexT2 = null;

    for (let i = 0; i < props.activeEvent.Teams.items.length; i++) {
      if (props.activeEvent.Teams.items[i].name === team1) indexT1 = i;
      if (props.activeEvent.Teams.items[i].name === team2) indexT2 = i;
    }
    if (indexT1 === null || indexT2 === null) return;
    let team1Obj = props.activeEvent.Teams.items[indexT1];
    let team2Obj = props.activeEvent.Teams.items[indexT2];

    console.log(team1Obj);
    console.log(team2Obj);
    console.log(gamesArr);
    let gameObj = null;
    let gameIndex = null;
    for (let i = 0; i < props.activeEvent.Games.items.length; i++) {
      if (team1 === gamesArr[i].team1 && team2 === gamesArr[i].team2) {
        gameIndex = i;
        gameObj = gamesArr[i];
        break;
      }
    }
    if (gameObj === null) return;

    if (!gameObj.done) {
      team1Obj.playedGames++;
      team2Obj.playedGames++;
      team1Obj.dif = team1Obj.dif + parseInt(textfield1) - parseInt(textfield2);
      team2Obj.dif = team2Obj.dif + parseInt(textfield2) - parseInt(textfield1);
      if (textfield1 > textfield2) {
        team1Obj.score += 3;
      } else if (textfield2 > textfield1) {
        team2Obj.score += 3;
      } else {
        team2Obj.score++;
        team1Obj.score++;
      }
    } else {
      alert("To be continued!");
    }

    const game1 = {
      id: gameObj.id,
      done: true,
      scoreT1: textfield1,
      scoreT2: textfield2,
    };
    await API.graphql({
      query: updateGame,
      variables: { input: game1 },
    });

    const updateTeam1 = {
      id: team1Obj.id,
      score: team1Obj.score,
      dif: team1Obj.dif,
      playedGames: team1Obj.playedGames,
    };
    await API.graphql({
      query: updateTeam,
      variables: { input: updateTeam1 },
    });

    const updateTeam2 = {
      id: team2Obj.id,
      score: team2Obj.score,
      dif: team2Obj.dif,
      playedGames: team2Obj.playedGames,
    };
    await API.graphql({
      query: updateTeam,
      variables: { input: updateTeam2 },
    });

    props.activeEvent.Games.items[gameIndex] = gameObj;
    props.activeEvent.Teams.items[indexT1] = team1Obj;
    props.activeEvent.Teams.items[indexT2] = team2Obj;
    props.activeEvent.Teams.items.sort(comp);
    setTextfield1(0);
    setTextfield2(0);
    setActiveEdit("");
    props.rend();
  }

  return (
    <div>
      <h4>Spielplan</h4>
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%" }}>Team 1</div>
        <div style={{ width: "30%" }}>Team 2</div>
        <div style={{ width: "15%" }}>Punkte Team 1</div>
        <div style={{ width: "15%" }}>Punkte Team 2</div>
        <div style={{ width: "10%" }}></div>
      </div>

      <ul className="u-List">
        {props.activeEvent.Games.items.map((e) => (
          <li key={e.team1 + e.team2} style={{ display: "flex" }}>
            <div style={{ width: "28%", padding: "1%" }}>{e.team1}</div>
            <div style={{ width: "28%", padding: "1%" }}>{e.team2}</div>

            {!(activeEdit === e.team1 + e.team2) && (
              <div>
                <TextField
                  size="small"
                  value={e.scoreT1}
                  style={{ width: "35%", paddingRight: "2%" }}
                ></TextField>
                <TextField
                  value={e.scoreT2}
                  size="small"
                  style={{ width: "35%", paddingRight: "2%" }}
                ></TextField>
                <IconButton onClick={() => setActiveEdit(e.team1 + e.team2)}>
                  <EditIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            )}
            {activeEdit === e.team1 + e.team2 && (
              <div>
                <TextField
                  size="small"
                  style={{ width: "35%", paddingRight: "2%" }}
                  onChange={handleTF1change}
                ></TextField>
                <TextField
                  size="small"
                  style={{ width: "35%", paddingRight: "2%" }}
                  onChange={handleTF2change}
                ></TextField>
                <IconButton onClick={() => addResult(e.team1, e.team2)}>
                  <CheckIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;
