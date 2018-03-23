import React, { Component } from "react";
import { Card, CardMedia } from "material-ui/Card";

import "../css/card.css";

const mainImg = "https://image.tmdb.org/t/p/w500";
const backdropImg = "https://image.tmdb.org/t/p/original";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_img: "",
      backdrop_img: "",
      overview: "",
      title: "",
      release_date: "",
      vote_average: "",
      runtime: "",
      revenue: "",
      tagline: "",
      homepage: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    var movie = nextProps.MovieDetails;
    this.setState(
      {
        main_img: mainImg + movie.poster_path,
        backdrop_img: backdropImg + movie.backdrop_path,
        overview: movie.overview,
        title: movie.title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        runtime: movie.runtime,
        revenue: movie.revenue,
        tagline: movie.tagline,
        homepage: movie.homepage
      },
      () => {
        console.log(this.state);
      }
    );
  }

  render() {
    const Revenue = () => {
      if (this.state.revenue) {
        var reve = this.state.revenue;
        var str = reve.toString().split();
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
        reve = str.toString();
        return <div className="col">{reve}</div>;
      } else {
        return <div className="col">Not Available</div>;
      }
    };

    const OkComp = () => {
      if (this.state.main_img) {
        return (
          <div className="container">
            <Card className="Main">
              <div className="row">
                <div className="col-6">
                  <CardMedia className="Image">
                    <img
                      src={this.state.main_img}
                      alt="This will be rendered !"
                    />
                  </CardMedia>
                </div>
                <div className="col-6 Details">
                  <div className="MainDetails">
                    <p className="Title">{this.state.title}</p>
                    <p className="Tagline">{this.state.tagline}</p>
                    <p className="Overview">{this.state.overview}</p>
                  </div>
                  <div className="Other">
                    <div className="row">
                      <div className="col Heading">Release Date</div>
                      <div className="col Heading">Popularity</div>
                    </div>
                    <div className="row DetailsTop">
                      <div className="col">{this.state.release_date}</div>
                      <div className="col">{this.state.vote_average}</div>
                    </div>

                    <div className="row">
                      <div className="col Heading">Revenue</div>
                      <div className="col Heading">Run Time</div>
                    </div>
                    <div className="row DetailsTop">
                      <Revenue />
                      <div className="col">{this.state.runtime}</div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <a href={this.state.homepage}>Official Website</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      } else {
        return <span className="Loading">Loading... </span>;
      }
    };

    return <OkComp />;
  }
}

export default Movie;
