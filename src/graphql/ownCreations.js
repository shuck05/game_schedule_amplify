export const GenerateGame = /* GraphQL */ `
  mutation GenerateGame(
    $team1: String = ""
    $team2: String = ""
    $eventGamesId: ID = ""
  ) {
    createGame(
      input: {
        team1: $team1
        team2: $team2
        scoreT1: 0
        scoreT2: 0
        done: false
        eventGamesId: $eventGamesId
      }
    ) {
      id
    }
  }
`;

export const GenerateTeam = /* GraphQL */ `
  mutation GenerateTeam($name: String = "", $eventTeamsId: ID = "") {
    createTeam(
      input: {
        dif: 0
        name: $name
        playedGames: 0
        score: 0
        eventTeamsId: $eventTeamsId
      }
    ) {
      id
    }
  }
`;

export const GenerateUser = /* GraphQL */ `
  mutation GenerateUser($events: [String] = "") {
    createUser(input: { email: "qwerty@123.de", events: $events }) {
      email
    }
  }
`;

export const getEventName = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
    }
  }
`;

export const listEventnames = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
