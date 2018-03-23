import React, { Component } from "react";
import AutoComplete from "material-ui/AutoComplete";
import "../css/search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      movies: [],
      movieData: []
    };
  }

  componentDidMount() {
    this.selectMovie(284054);
  }

  fetchMovieData(title) {
    if (this.state.searchText.length >= 3) {
      var movies = [];
      var movieData = [];
      fetch(`/api/search/${title}`)
        .then(res => res.json())
        .then(data => {
          data.map(mov => {
            movieData.push(mov);
            movies.push(mov.title);
          });
          this.setState({ movies, movieData });
        });
    }
  }
  handleUpdateInput = searchText => {
    this.setState({ searchText }, this.fetchMovieData(searchText));
  };

  selectMovie(id) {
    fetch(`/api/movie/${id}`)
      .then(res => res.json())
      .then(data => this.props.SelectedMovie(data));
  }

  handleNewRequest = (title, index) => {
    this.state.movieData.map(mov => {
      if (title === mov.title) {
        console.log(mov);
        this.selectMovie(mov.id);
      } else return 0;
    });
  };

  render() {
    return (
      <div>
        <AutoComplete
          className="Search"
          hintText="Search Movie"
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={this.state.movies}
          filter={(searchText, key) => key.indexOf(searchText) !== -1}
        />
      </div>
    );
  }
}

export default Search;
