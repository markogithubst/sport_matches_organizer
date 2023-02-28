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
  schemes: ['http'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  },
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
    }

  },

  security: [{
    bearerAuth: []
  }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
