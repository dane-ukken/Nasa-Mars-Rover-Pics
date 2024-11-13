# Server App for Mars Rover Images
This is a Express.js server app that allows users to view Mars rover images for a given date.

## Exposed REST Endpoints

- GET list of dates: `/api/v1/file/dates`
  - http://localhost:3000/api/v1/dates
- GET list of rovers: `/api/v1/rovers`
  - http://localhost:3000/api/v1/rovers
- GET list of photos for a given date and rover: `/api/v1/rovers/images`
  - http://localhost:3000/api/v1/rovers/images?rover=opportunity&date=2018-06-02
- POST download an individual photo to server's file system - under public/downloads/:rover/:date/:id.jpg: `/api/v1/rovers/save-image`
  - http://localhost:3000/api/v1/rovers/save-image
  body:
  ```
  {
    "imageUrl": "http://mars.jpl.nasa.gov/msl-raw-images/msss/01622/mcam/1622MR0083260010801245I01_DXXX.jpg",
    "rover": "opportunity",
    "date": "2018-06-02",
    "camera": "mcam",
    "id": "617694"
  }
  ```


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
