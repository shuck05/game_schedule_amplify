/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
      Teams {
        items {
          id
          name
          score
          playedGames
          dif
          createdAt
          updatedAt
          eventTeamsId
          owner
        }
        nextToken
      }
      Games {
        items {
          id
          team1
          team2
          scoreT1
          scoreT2
          done
          createdAt
          updatedAt
          eventGamesId
          owner
        }
        nextToken
      }
      Users
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        Teams {
          nextToken
        }
        Games {
          nextToken
        }
        Users
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      ev {
        id
        name
        Teams {
          nextToken
        }
        Games {
          nextToken
        }
        Users
        createdAt
        updatedAt
        owner
      }
      team1
      team2
      scoreT1
      scoreT2
      done
      createdAt
      updatedAt
      eventGamesId
      owner
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ev {
          id
          name
          Users
          createdAt
          updatedAt
          owner
        }
        team1
        team2
        scoreT1
        scoreT2
        done
        createdAt
        updatedAt
        eventGamesId
        owner
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      score
      playedGames
      dif
      ev {
        id
        name
        Teams {
          nextToken
        }
        Games {
          nextToken
        }
        Users
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      eventTeamsId
      owner
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        score
        playedGames
        dif
        ev {
          id
          name
          Users
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        eventTeamsId
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($email: String!) {
    getUser(email: $email) {
      email
      events
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $email: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        events
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
