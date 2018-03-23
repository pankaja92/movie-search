import React, { Component } from "react";
import "./css/app.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import moviedb from "./resources/moviedb.svg";

import Search from "./components/search";
import Movie from "./components/card";
import Copyright from "./components/credits";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      backdrop: ""
    };
  }

  Selected(movie) {
    this.setState({
      movie,
      backdrop: "https://image.tmdb.org/t/p/original" + movie.backdrop_path
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Search SelectedMovie={this.Selected.bind(this)} />
          <Movie MovieDetails={this.state.movie} />
          <div>
            <a
              href="https://www.themoviedb.org/?language=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={moviedb} className="Logo" alt="moviedb logo" />
            </a>
          </div>
          <Copyright />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
