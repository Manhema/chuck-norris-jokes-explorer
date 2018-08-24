import React, { Component } from "react";

import { connect } from "react-redux";
import { categories, category } from "../../../redux/actions/actions";

import { Loader, images_chuck } from "../../common/common";

class Joke extends React.Component {
  render() {
    let hme_style = {
      fontSize: "0.8em",
      textDecoration: "none",
      display: "block",
      color: "rgb(237, 28, 36)",
      cursor: "pointer"
    };

    return (
      <div>
        <img className="my-2 pb-2" src={this.props.category.icon_url} />
        <p
          className="mb-2 px-0 px-sm-4 mx-0 mx-sm-4"
          style={{ fontWeight: "500", fontSize: "1rem" }}
        >
          <i>&ldquo;{this.props.category.value}&rdquo;</i>
        </p>
        <button
          className="btn btn-outline-dark mt-4"
          type="button"
          style={{ fontSize: "0.9rem" }}
          onClick={() => this.props.nextJoke()}
        >
          Next Joke
        </button>
        <div className="pt-2 mt-4">
          <span
            className="text-center pt-sm-2 "
            style={hme_style}
            onClick={() => this.props.view(0)}
          >
            <i
              className="icon ion-ios-close-circle-outline"
              style={{ fontSize: "2rem", color: "#9a9a9a" }}
            />
            <br className="py-0" />
            return to home
          </span>
        </div>
      </div>
    );
  }
}

class JokeComponent extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.category(this.props.type);
  }

  nextJoke() {
    this.props.category(this.props.type);
  }

  render() {
    let imgStyle = {
      height: "5.5rem",
      width: "5.5rem",
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
    let cat = this.props.type;
    let image_scr = images.filter(function(model) {
      return model.category == cat;
    })[0];

    let {
      data,
      isCategoryPending,
      isCategorySuccess,
      categoryError,
      categoryFailure
    } = this.props;

    return (
      <div className="container py-2 text-center">
        <h3 className="" style={{ fontWeight: "900", fontSize: "2.7rem" }}>
          Chuck Norris
        </h3>
        <div className="">
          <img src={image_scr.image} style={imgStyle} />
          <br />
          <span style={{ fontWeight: "900", fontSize: "1.7rem" }}>
            {this.props.type}
          </span>
        </div>
        <h1 className="" style={{ fontWeight: "900", fontSize: "3rem" }}>
          <i>Jokes</i>
        </h1>
        {isCategoryPending && <Loader />}
        {isCategorySuccess && (
          <div className="">
            <Joke
              category={data}
              nextJoke={() => this.nextJoke()}
              view={(page, type) => this.props.view(page, type)}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.category.category,
    isCategoryPending: state.category.isCategoryPending,
    isCategorySuccess: state.category.isCategorySuccess,
    categoryError: state.category.categoryError,
    categoryFailure: state.category.categoryFailure
  };
};

const mapDispatchToProps = dispatch => {
  return {
    category: type => dispatch(category(type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JokeComponent);
