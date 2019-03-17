import React, { Component } from "react";

import { connect } from "react-redux";
import { categories } from "../../redux/actions/actions";

import JokeComponent from "./category/CategoryComponent.js";

import { Loader, images_chuck } from "../common/common";

class Featured extends React.Component {
  render() {
    let imgStyle = {
      height: "4.5rem",
      width: "4.5rem",
      objectFit: "cover",
      // borderTopLeftRadius: '5px',
      // borderTopRightRadius: '5px',
      borderRadius: "50%",
      border: "3px solid rgba(0,0,0,.1)"
    };

    let fs085em = {
      fontSize: "0.8em",
      textDecoration: "none",
      display: "block",
      color: "#9a9a9a"
    };

    let images = images_chuck();
    let cat = this.props.name;
    let image_scr = images.filter(function(model) {
      return model.category == cat;
    })[0];

    return (
      <div className="col-4 col-sm-4 col-md-4">
        <div
          className=""
          style={{ color: "whitesmoke", cursor: "pointer" }}
          onClick={type => this.props.selectCategory(this.props.name)}
        >
          <img src={image_scr.image} style={imgStyle} />
          <br />
          <small style={{ textTransform: "capitalize" }}>
            <b>{this.props.name}</b>
          </small>
        </div>
      </div>
    );
  }
}

class Banner extends React.Component {
  selectCategory(type) {
    this.props.view(1, type);
  }

  render() {
    let jumbotron = {
      background:
        '-webkit-linear-gradient(rgba(0,0,0,0.72),rgba(0,0,0,0.2)), url("https://cdn.pixabay.com/photo/2013/07/13/13/34/man-161135_1280.png"), no-repeat center center',
      background:
        "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.72)),url(https://cdn.pixabay.com/photo/2013/07/13/13/34/man-161135_1280.png),no-repeat center",
      WebkitBackgroundSize: "cover",
      MozBackgroundSize: "cover",
      OBackgroundSize: "cover",
      backgroundSize: "cover",
      borderRadius: "0",
      boxShadow: "inset 0px -120px 80px -60px rgba(0,0,0,0.5)"
    };

    // randomly shuffle the categories
    let shuffled_categories = this.props.categories
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);

    //render 3 random categories as featured
    let featured = shuffled_categories.slice(0, 3).map(
      function(category, i) {
        return (
          <Featured
            key={i}
            name={category}
            selectCategory={type => this.selectCategory(type)}
          />
        );
      }.bind(this)
    );

    return (
      <div className="jumbotron jumbotron-fluid " style={jumbotron}>
        <div className="container pb-sm-0 pb-3 text-center">
          <div className="px-2" style={{ color: "whitesmoke" }}>
            <h1
              className=""
              style={{ fontWeight: "900", fontSize: "3rem", color: "#fff" }}
            >
              Explore
            </h1>
            <h3
              className=""
              style={{ fontWeight: "900", fontSize: "2.7rem", color: "#fff" }}
            >
              Chuck Norris
            </h3>
            <h1
              className=""
              style={{ fontWeight: "900", fontSize: "3rem", color: "#fff" }}
            >
              <i>Jokes</i>
            </h1>
            <br />
            <br />
            <h5
              className="mb-4"
              style={{ fontWeight: "800", fontSize: "1.5rem" }}
            >
              "Featured Categories"
            </h5>
          </div>
          <div className="row">{featured}</div>
        </div>
      </div>
    );
  }
}

class Category extends React.Component {
  render() {
    let imgStyle = {
      height: "10.5rem",
      width: "100%",
      objectFit: "cover",
      borderTopLeftRadius: "5px",
      borderTopRightRadius: "5px"
    };

    let images = images_chuck();
    let cat = this.props.name;
    let image_scr = images.filter(function(model) {
      return model.category == cat;
    })[0];

    return (
      <div className="col-6 col-sm-4 col-md-3 mb-2">
        <div
          className=""
          style={{ cursor: "pointer" }}
          onClick={type => this.props.selectCategory(this.props.name)}
        >
          <img src={image_scr.image} style={imgStyle} />
          <p style={{ textTransform: "capitalize" }}>{this.props.name}</p>
        </div>
      </div>
    );
  }
}

class Categories extends React.Component {
  selectCategory(type) {
    this.props.view(1, type);
  }

  render() {
    let cats = this.props.categories.map(
      function(category, i) {
        return (
          <Category
            key={i}
            name={category}
            status="closed"
            selectCategory={type => this.selectCategory(type)}
          />
        );
      }.bind(this)
    );

    return (
      <div className="py-2 row text-center">
        <div className="col-sm-12 pb-2">
          <h4
            className="pb-2 pt-1"
            style={{ fontWeight: "900", fontSize: "2rem" }}
          >
            All Categories
          </h4>
        </div>
        <div className="col-sm-12">
          <div className="row">{cats}</div>
        </div>
      </div>
    );
  }
}

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      type: null
    };
  }

  componentDidMount() {
    this.props.categories();
  }

  view(page, type) {
    this.setState({
      page: page,
      type: type
    });
  }

  render() {
    let {
      data,
      isCategoriesPending,
      isCategoriesSuccess,
      categoriesError,
      categoriesFailure
    } = this.props;

    return (
      <div className="">
        {isCategoriesPending && <Loader />}
        {isCategoriesSuccess &&
          this.state.page == 0 && [
            <Banner
              categories={data}
              view={(page, type) => this.view(page, type)}
            />,
            <div className="container mt-4">
              <Categories
                categories={data}
                view={(page, type) => this.view(page, type)}
              />
            </div>
          ]}
        {isCategoriesSuccess && this.state.page == 1 && (
          <JokeComponent
            type={this.state.type}
            view={(page, type) => this.view(page, type)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.categories.categories,
    isCategoriesPending: state.categories.isCategoriesPending,
    isCategoriesSuccess: state.categories.isCategoriesSuccess,
    categoriesError: state.categories.categoriesError,
    categoriesFailure: state.categories.categoriesFailure
  };
};

const mapDispatchToProps = dispatch => {
  return {
    categories: () => dispatch(categories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
