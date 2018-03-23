const API_KEY = require('./config/keys').API_KEY;
const MovieDb = require("moviedb-promise");
const moviedb = new MovieDb(API_KEY);

let movies = [];

module.exports = app => {
  app.get("/api/search/:movie", async (req, res) => {
    const movie = req.params.movie;
    try {
      const result = await moviedb.searchMovie({ query: movie });
      movieList = result.results;
      res.send(movieList);
    } catch (err) {
      console.error(err);
    }
  });

  app.get("/api/movie/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await moviedb.movieInfo({ id: id });
      movie = result;
      res.send(movie);
    } catch (err) {
      console.log(err);
    }
  });
};
// 284054
