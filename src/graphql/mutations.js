/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
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
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
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
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      email
      events
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      email
      events
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      email
      events
      createdAt
      updatedAt
      owner
    }
  }
`;
