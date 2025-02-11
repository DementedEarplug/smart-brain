import React, { Component } from "react";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import "./App.css";

const particlesOptions = {
  //customize this to your liking
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    age: 0,
    pet: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (token) {
      console.log("Already have a token");
      fetch("http://localhost:8080/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            this.fetchUserProfile(data.id, token);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  fetchUserProfile = async (id, token) => {
    try {
      const response = await fetch(`http://localhost:8080/profile/${id}`, {
        headers: { Authorization: token },
      });
      const user = await response.json();
      if (user.id) {
        this.loadUser(user);
        this.onRouteChange("home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        age: data.age,
        pet: data.pet,
      },
    });
  };

  calculateFaceLocation = (data) => {
    console.log(data);
    const image = document.getElementById("inputimage");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    if (data.outputs) {
      return data.outputs[0].data.regions.map((face) => {
        const clarifaiFace = face.region_info.bounding_box;
        let leftCol = clarifaiFace.left_col * imageWidth;
        let topRow = clarifaiFace.top_row * imageHeight;
        let rightCol = imageWidth - clarifaiFace.right_col * imageWidth;
        let bottomRow = imageHeight - clarifaiFace.bottom_row * imageHeight;
        return {
          leftCol,
          topRow,
          rightCol,
          bottomRow,
        };
      });
    }
  };

  displayFaceBox = (boxes) => {
    if(boxes){
      this.setState({ boxes: boxes });
    }
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ boxes: [] });

    this.setState({ imageUrl: this.state.input });
    fetch("http://localhost:8080/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status) { //Status only exist on good responses
          fetch("http://localhost:8080/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: sessionStorage.getItem("token") || "",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      return this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes, isProfileOpen } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile
              toggleModal={this.toggleModal}
              loadUser={this.loadUser}
              id={this.state.user.id}
              joined={this.state.user.joined}
              name={this.state.user.name}
              age={this.state.user.age}
              pet={this.state.user.pet}
            />
          </Modal>
        )}
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
