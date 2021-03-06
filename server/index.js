const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const MovieDb = require("moviedb-promise");

const API_KEY = "1145a7f2df72886c5630f606bfa1ee64";
const moviedb = new MovieDb(API_KEY);

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

   // Answer API requests.
   app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // Answer API requests.
  app.get("/api/movie/:id", async (req, res) => {
    console.log('Get Movie method is called');
    const id = req.params.id;
    try {
      const result = await moviedb.movieInfo({ id: id });
      movie = result;
      res.send(movie);
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/api/search/:movie", async (req, res) => {
    console.log('Search Movie method is called');
    const movie = req.params.movie;
    console.log(movie);
    try {
      const result = await moviedb.searchMovie({ query: movie });
      movieList = result.results;
      res.send(movieList);
    } catch (err) {
      console.error(err);
    }
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function(request, response) {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  app.listen(PORT, function() {
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
