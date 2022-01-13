const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const urlParse = require("url").URL; // const appsyncUrl = process.env.API_gamescheduleGraphQL_GRAPHQLAPIENDPOINTOUTPUT;
const { ConsoleLogger } = require("@aws-amplify/core");
const appsyncUrl =
  "https://ylf4hnrtrbbspkdwufxhfdtdeu.appsync-api.eu-west-1.amazonaws.com/graphql";
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const apiKey = process.env.API_gamescheduleGraphQL_GRAPHQLAPIKEYOUTPUT;

const createEvent = gql`
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
    }
  }
`;

const createTeam = gql`
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
    }
  }
`;

const createGame = gql`
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
      id
    }
  }
`;

const getUser = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      email
      events
    }
  }
`;

const createUser = gql`
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      email
    }
  }
`;

const updateUser = gql`
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      email
    }
  }
`;

//exports.handler = async (event) => {
async function lambdaFunc() {
  //const data = JSON.parse(event.body);
  const data = {
    name: "Volleyball",
    Users: ["basti-huck@t-online.de"],
    teams: ["Team1", "Team2", "Team3"],
    games: [
      { team1: "Team1", team2: "Team2" },
      { team1: "Team3", team2: "Team1" },
    ],
  };
  const API_Data = {
    appsyncUrl: appsyncUrl,
    region: region,
    endpoint: endpoint,
    apikey: "da2-job3b27u4jei3crz3fiau2cjj4",
  };

  try {
    const eventInput = {
      name: data.name,
      Users: data.Users,
    };

    const graphqlEventData = await axios({
      url: API_Data.appsyncUrl,
      method: "post",
      headers: {
        "x-api-key": API_Data.apikey,
      },
      data: {
        query: print(createEvent),
        variables: {
          input: eventInput,
        },
      },
    });
    const eventID = graphqlEventData.data.data.createEvent.id;
    let teamInput = null;
    for (let i = 0; i < data.teams.length; i++) {
      teamInput = {
        name: data.teams[i],
        score: 0,
        playedGames: 0,
        dif: 0,
        eventTeamsId: eventID,
      };

      await axios({
        url: API_Data.appsyncUrl,
        method: "post",
        headers: {
          "x-api-key": API_Data.apikey,
        },
        data: {
          query: print(createTeam),
          variables: {
            input: teamInput,
          },
        },
      });
    }

    let gameInput = null;
    for (let i = 0; i < data.games.length; i++) {
      console.log("GameLoop");
      gameInput = {
        team1: data.games[i].team1,
        team2: data.games[i].team2,
        scoreT1: 0,
        scoreT2: 0,
        done: false,
        eventGamesId: eventID,
      };

      await axios({
        url: API_Data.appsyncUrl,
        method: "post",
        headers: {
          "x-api-key": API_Data.apikey,
        },
        data: {
          query: print(createGame),
          variables: {
            input: gameInput,
          },
        },
      });
    }

    let user = null;
    for (let i = 0; i < data.Users.length; i++) {
      user = await axios({
        url: API_Data.appsyncUrl,
        method: "post",
        headers: {
          "x-api-key": API_Data.apikey,
        },
        data: {
          query: print(getUser),
          variables: {
            email: data.Users[i],
          },
        },
      });
      user = user.data.data.getUser;
      if (user === null) {
        await axios({
          url: API_Data.appsyncUrl,
          method: "post",
          headers: {
            "x-api-key": API_Data.apikey,
          },
          data: {
            query: print(createUser),
            variables: {
              input: { email: data.Users[i], events: [eventID] },
            },
          },
        });
      } else {
        await axios({
          url: API_Data.appsyncUrl,
          method: "post",
          headers: {
            "x-api-key": API_Data.apikey,
          },
          data: {
            query: print(updateUser),
            variables: {
              input: { email: user.email, events: [...user.events, eventID] },
            },
          },
        });
      }
    }
    const body = {
      message: "successfully created Event!",
    };
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
  } catch (err) {
    console.log("error creating Event: ", err);
  }

  return {
    statusCode: 500,
    body: "An Error Occoured",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  };
}
console.log("Start");
lambdaFunc();
console.log("End");
