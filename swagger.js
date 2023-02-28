/* eslint-disable no-useless-escape */
const dotenv = require('dotenv');
dotenv.config();
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

require('dotenv').config({
  path: '.env.development'
});

const doc = {
  info: {
    title: 'Sports Match Organizer Aplication',
    description: 'Simple API overview'
  },
  host: `localhost:${process.env.PORT}`,
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer'
    }
  },
  schemes: ['http'],
  definitions: {
    FieldList: {
      success: true,
      data: [
        {
          _id: '63eb76f1c6a15537f1bbb59f',
          name: 'Test Field 1',
          city: 'Split',
          address: 'Test Address 1',
          maxPlayers: 10
        }
      ]
    },
    FieldBody: {
      $name: 'Test Field 1',
      $city: 'Split',
      $address: 'Test Address 1',
      $maxPlayers: 10
    },
    FieldResponse: {
      success: true,
      data: {
        _id: '63e37f4a8bda2a935ce6454c',
        name: 'Test Field 1',
        city: 'Split',
        address: 'Test Address 1',
        maxPlayers: 10
      }
    },
    MatchList: {
      success: true,
      data: [
        {
          _id: '63eb7f4a8bda2a035ce6454c',
          whiteTeam: '63eb7aa9dda73e59e84aa443',
          blackTeam: '63eb7aa9dda73e59e84aa444',
          result: {
            _id: '63eb7dfe5f58194a262d8276',
            whiteTeamScore: 5,
            blackTeamScore: 3
          }
        }
      ]
    },
    ResultList: {
      success: true,
      data: [
        {
          _id: '63eb7dfe5f58194a262d8276',
          whiteTeamScore: 5,
          blackTeamScore: 3
        },
        {
          _id: '63eb7dfe5f58194a262d8277',
          whiteTeamScore: 5,
          blackTeamScore: 4
        }
      ]
    },
    TeamList: {
      success: true,
      data: [
        {
          _id: '63eb7aa9dda73e59e84aa443',
          players: [
            '63eb6abf9792291234cd6a75',
            '63eb6abf9792291234cd6a76',
            '63eb6abf9792291234cd6a77'
          ],
          color: 'white'
        },
        {
          _id: '63eb7aa9dda73e59e84aa444',
          players: [
            '63eb788d339bb827e5fe77d2',
            '63eb788d339bb827e5fe77d3',
            '63eb788d339bb827e5fe77d4'
          ],
          color: 'black'
        }
      ]
    },
    UserList: {
      success: true,
      data: [{
        _id: '63eb788d339bb827e5fe72d5',
        username: 'user1',
        name: 'user1',
        surname: 'user',
        email: 'user1@test.com',
        phone: '+1993288858',
        role: 'USER'
      }
      ]
    },
    UserBody: {
      $username: 'user1',
      $name: 'user1',
      $surname: 'user',
      $password: 'password',
      $email: 'user1@test.com',
      $phone: '+1993288858',
      $role: 'USER'
    },
    UserResponse: {
      success: true,
      data: {
        _id: '63eb788d339bb827e5fe72d5',
        username: 'user1',
        name: 'user1',
        surname: 'user',
        email: 'user1@test.com',
        phone: '+1993288858',
        role: 'USER'
      }
    },
    UserHistory:
      [
        {
          _id: '63eb7dfe5f58194a262d8222',
          field: {
            _id: '63eb76f1c6a15537f1bbb59f',
            name: 'Test Field 1'
          },
          match: {
            _id: '63eb7f4a8bda2a035ce6454c',
            whiteTeam: {
              _id: '63eb7aa9dda73e59e84aa443',
              players: [
                {
                  _id: '63eb6abf9792291234cd6a75',
                  username: 'jops'
                },
                {
                  _id: '63eb6abf9792291234cd6a76',
                  username: 'marks'
                },
                {
                  _id: '63eb6abf9792291234cd6a77',
                  username: 'ivks3'
                }
              ]
            },
            blackTeam: {
              _id: '63eb7aa9dda73e59e84aa444',
              players: [
                {
                  _id: '63eb788d339bb827e5fe77d2',
                  username: 'franks'
                },
                {
                  _id: '63eb788d339bb827e5fe77d3',
                  username: 'lovrks'
                },
                {
                  _id: '63eb788d339bb827e5fe77d4',
                  username: 'karlks'
                }
              ]
            },
            result: {
              _id: '63eb7dfe5f58194a262d8276',
              whiteTeamScore: 5,
              blackTeamScore: 3
            }
          },
          time: '2023-05-27T12:00:00.000Z'
        }
      ],
    ReservationList: {
      success: true,
      data: [{
        _id: '63eb7dfe5f58194a262d8222',
        field: '63eb76f1c6a15537f1bbb59f',
        match: '63eb7f4a8bda2a035ce6454c',
        num: 0,
        time: '2023-05-27T12:00:00.000Z',
        isCanceled: false,
        isFinished: true,
        isScheduled: true,
        registeredPlayers: [
          '63eb6abf9792291234cd6a75',
          '63eb6abf9792291234cd6a76',
          '63eb6abf9792291234cd6a77',
          '63eb788d339bb827e5fe77d2',
          '63eb788d339bb827e5fe77d3',
          '63eb788d339bb827e5fe77d4'
        ]
      }]
    },
    httpNotFound: {
      success: false,
      message: 'Data not found'
    },
    httpInternalError: {
      message: 'Something went wrong!'
    },
    httpUnauthenticated: {
      success: false,
      message: 'You must be logged in to view this page!'
    },
    httpUnauthorized: {
      success: false,
      message: 'You are not authorized to view this page!'
    },

    InvalidField: {
      message: '\"name\" length must be at least 5 characters long. \"maxPlayers\" is required. \"city\" is required'
    },
    InvalidUser: {
      message: [
        '\"username\" is required',
        '\"name\" is required',
        '\"email\" must be a valid email',
        '\"password\" length must be at least 8 characters long',
        '\"phone\" with value \"385993404575\" fails to match the required pattern: /^\\+(?:\\d\\s?){6,14}\\d$/'
      ]
    },
    InvalidId: {
      message: '\"id\" length must be at least 24 characters long'
    }

  },

  security: [{
    bearerAuth: []
  }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
