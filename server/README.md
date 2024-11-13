# Little Mars

I have added the .env file to the GitHub repo just for easy testing.

This is a Express.js server app that allows users to view Mars rover images for a given date.

## Exposed REST Endpoints

- GET list of dates: `/api/v1/file/dates`
  - http://localhost:3000/api/v1/dates
- GET list of rovers: `/api/v1/rovers`
  - http://localhost:3000/api/v1/rovers
- GET list of photos for a given date and rover: `/api/v1/rovers/images`
  - http://localhost:3000/api/v1/rovers/images?rover=opportunity&date=2018-06-02
- GET Call to fetch the photo from server. If it is not there, we save it from NASA and serve it: `/api/v1/file/image  /:rover/:date/:camera/:id`
  - http://localhost:3000/api/v1/file/image/opportunity/2018-06-02/mcam/617694


### Prerequisites

- Node version 18+
- Docker (only if you want to run as Docker container)

### Installing

- Clone or download this repository
- Enter your local directory, and build for first time

```bash
npm install
```

## Running the tests

```bash
npm run test
```

## Build

### Build locally
I have passed .env in GitHub just for easy testing
```bash
npm run build
```

### Build as a Docker container
To build the jar and packge up in a Docker container, run the following command:

```bash
npm run docker
```


Express.js will start up the server at port **3000**.  The APIs will be accessible at `http://localhost:3000`

## Running in a Docker container

After running `npm run docker`, run the following command to start the docker container:

```bash
docker run -p 3000:3000 --env-file .env little-mars-server:latest
```

Express will start up the server in the Docker container at port **3000**.  The APIs will be accessible at `http://localhost:3000`

## Built With

* [Node JS](https://nodejs.org/en) - Run time environment
* [Express](https://expressjs.com/) - Web framework
* [Docker](https://www.docker.com/) - Container Platform
* [Nasa API](https://api.nasa.gov/) - Mars Rover Images API
* [Axios](https://axios-http.com/) - HTTP client
* [Jest](https://jestjs.io/) - Testing framework
* [SonarQube](https://www.sonarqube.org/) - Code Quality
* [ESLint](https://eslint.org/) - Linting
* [Prettier](https://prettier.io/) - Code Formatting
* [Husky](https://typicode.github.io/husky/#/) - Git Hooks
