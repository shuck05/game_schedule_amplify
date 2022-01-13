import { Button, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./styles/SideDrawer.css";
import { useState } from "react";
import { useEffect } from "react";
import { Auth, API } from "aws-amplify";
import { getEvent, getUser } from "../graphql/queries";
import { deleteEvent, deleteTeam, deleteGame } from "../graphql/mutations";
import { getEventName } from "../graphql/ownCreations";

function Sidedrawer(props) {
  const [eventNames, setEventNames] = useState(null);

  useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      if (user !== null && user !== undefined) {
        getEventNames(user.attributes.email);
      }
    });
    // eslint-disable-next-line
  }, [props.newEntry]);

  function toggleNewEntry() {
    props.toggleNewEntry();
  }

  async function setActiveEvent(id) {
    if (props.activeEvent !== null) {
      if (id === props.activeEvent.id) {
        props.setActiveEvent(null);
        return;
      }
    }
    getEventbyID(id);
  }

  function comp(team1, team2) {
    if (team1.score > team2.score) return -1;
    if (team1.score < team2.score) return 1;
    if (team1.score === team2.score) {
      if (team1.difference > team2.difference) return -1;
      if (team1.difference < team2.difference) return 1;
    }
    return 0;
  }

  async function getEventbyID(id) {
    const response = await API.graphql({
      query: getEvent,
      variables: { id: id },
    });
    response.data.getEvent.Teams.items.sort(comp);
    props.setActiveEvent(response.data.getEvent);
  }

  async function getEventNames(mail) {
    const User = await API.graphql({
      query: getUser,
      variables: {
        email: mail,
      },
    });
    let event = null;
    let arr = [];
    for (let i = 0; i < User.data.getUser.events.length; i++) {
      event = await API.graphql({
        query: getEventName,
        variables: {
          id: User.data.getUser.events[i],
        },
      });
      if (event.data.getEvent === null) continue;
      event = {
        id: event.data.getEvent.id,
        name: event.data.getEvent.name,
      };
      arr.push(event);
    }
    setEventNames(arr);
  }

  async function handleDeleteEvent(eventId) {
    const deletedEv = await API.graphql({
      query: deleteEvent,
      variables: { input: { id: eventId } },
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

    props.setActiveEvent(null);
    getEventNames();
  }

  function refreshEventList() {
    alert("Refresh Eventnames");
  }

  return (
    <div className="SideDrawer">
      <div className="Sidedrawer-Button">
        <Button className="ButtonAsH2" onClick={toggleNewEntry}>
          Neues Event
        </Button>
      </div>
      <ul className="u-List">
        {eventNames === null ? (
          <h6>Noch keine Events</h6>
        ) : (
          eventNames.map((e) => (
            <li key={e.id}>
              <Button
                className="ButtonAsH2"
                onClick={() => setActiveEvent(e.id)}
              >
                {e.name}
              </Button>
              <Button
                className="ButtonAsH2"
                onClick={() => handleDeleteEvent(e.id)}
              >
                X
              </Button>
            </li>
          ))
        )}
      </ul>
      <IconButton onClick={refreshEventList} style={{ color: "white" }}>
        <RefreshIcon />
      </IconButton>
    </div>
  );
}

export default Sidedrawer;
