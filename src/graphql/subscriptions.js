/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($owner: String) {
    onCreateEvent(owner: $owner) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($owner: String) {
    onUpdateEvent(owner: $owner) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($owner: String) {
    onDeleteEvent(owner: $owner) {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($owner: String) {
    onCreateGame(owner: $owner) {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($owner: String) {
    onUpdateGame(owner: $owner) {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame($owner: String) {
    onDeleteGame(owner: $owner) {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam($owner: String) {
    onCreateTeam(owner: $owner) {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam($owner: String) {
    onUpdateTeam(owner: $owner) {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam($owner: String) {
    onDeleteTeam(owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
      email
      events
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
      email
      events
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      email
      events
      createdAt
      updatedAt
      owner
    }
  }
`;
