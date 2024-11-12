# Server App for Mars Rover Images

This is a Express.js server app that allows users to view Mars rover images for a given date.

## Exposed REST Endpoints



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

## Build

### Build locally

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
docker run -p 3000:3000 -t [TBD] -d
```

Express will start up the server in the Docker container at port **3000**.  The APIs will be accessible at `http://localhost:3000`

## Built With

* [Node JS](https://nodejs.org/en) - Run time environment
* [Express](https://expressjs.com/) - Web framework
* [Docker](https://www.docker.com/) - Container Platform
* [Nasa API](https://api.nasa.gov/) - Mars Rover Images API
* [Axios](https://axios-http.com/) - HTTP client
* [Jest](https://jestjs.io/) - Testing framework
