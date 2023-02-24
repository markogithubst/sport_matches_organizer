<a name="readme-top"></a>


<br />
<div align="center">

  <h1 align="center">Sports Match Organizer App</h1>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
      </ul>
    </li>
  </ol>
</details>
<br>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a web application that helps users organize their matches. It is built with NodeJS, Express and Mongoose. Integration tests are written using Jest.

The application allows users to: 
- register 
- log in / log out
- update and delete their account
- make a reservation for a match in the future
- view their match history along with the corresponding results
- unregistered users can filter reservations for upcoming matches by date, day of the week and hour

A user with admin access can create, view, update and delete fields, reservations and results. Teams and matches are created automatically once there are enough players registered for a match and the weather conditions allow for the match to be played at the planned time. Both team and match can be updated and deleted by admin user.

Cron jobs are used to perform checks on reservations every day at 9AM. 
- First check is to see if there are enough players registered for the match on that day. 6 players need to be registered so that they could be arranged into two teams. 
- If there aren't enough players, the match is canceled. 
- If there are 6 players then the next action is an API call to an external API (OpenWeather API) to check if the weather conditions are suitable for a match to be played. 
- The following is considered a reason for cancelation: rain, humidity above 89%, temperature below 4 celsius, snow, strong wind above 80 km/h, high temperatures over 33°C.
- If the match is canceled, the registered users will be notified via email. 
- After checking the conditions if the match is scheduled, the registered users will be notified via email.

Once the match has been finished, a user with admin access is expected to input the result of the match. 
- Another cron job is set to check if the results have been added for the matches that are finished. 
- If there are no results, admin users will be notified via email.

<br>



### Built With


* [NodeJS](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Docker](https://www.docker.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://www.mongoosejs.com/)

<br>

### Prerequisites
What software you need to use the application, and how to install it:

- [NodeJS](https://nodejs.org/en/download/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Getting Started

1. Clone the repository to your local machine using the following command in your terminal:
   ```sh
   git clone https://github.com/agilathon/sport_matches_organizer.git
   ```


2. Run the docker-compose.yaml to set up the database (MongoDB instance):
   ```sh
   docker compose up
   ```


3. Install the dependencies (NPM packages):
   ```sh
   npm install
   ```


4. Create .env files so you can start the APP in different environments. Example below:

```sh
    NODE_ENV=environment
    DB_USERNAME=username
    DB_PASSWORD=password
    JWT_SECRET=secretkey
    JWT_EXPIRATION=expirationtime
    PORT=port
    API_KEY=weatherapikey
```

**Note:**
.env.development should be defined in order to run the scripts for seeding the database and starting up the server in the steps below.
Apart from the development .env, .env.test environment should also be defined in order to run the unit and integration tests.



5. Seed the database:

   ```sh
   npm run seed
   ```


6. Run development server with
   ```sh
   npm run dev
   ```

**Note:**
A Postman collection is included in the project files and can be used to test the functionality of the application. 

### Running Tests

Run unit and integration tests

```sh
npm run jest
```



<p align="right">(<a href="#readme-top">back to top</a>)</p>