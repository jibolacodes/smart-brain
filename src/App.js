import { useState } from "react";

import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Rank from "./components/Rank";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import Signin from "./components/SignIn/Signin";
import Register from "./components/Register/Register";

function App() {
  const [formData, setFormData] = useState({
    input: "",
    imageUrl: "",
    box: {},
  });

  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const calculateFaceLocation = (data) => {
    const response =
      JSON.parse(data).outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("input-image");

    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: response.left_col * width,
      topRow: response.top_row * height,
      rightCol: width - response.right_col * width,
      bottomRow: height - response.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setFormData({ ...formData, box: box });
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      input: event.target.value,
    });
  };

  const handleSubmit = () => {
    setFormData({
      ...formData,
      imageUrl: formData.input,
    });
    console.log(formData);
  };

  const onRouteChange = (route) => {
    if (route !== "home") {
      setIsSignedIn(false);
    } else {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  // API Call
  const raw = JSON.stringify({
    user_app_id: {
      user_id: "jibolacodes",
      app_id: "my-first-application",
    },
    inputs: [
      {
        data: {
          image: {
            url: formData.imageUrl,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key 18ee366295bb4a399d45946b6b42b0d0",
    },
    body: raw,
  };

  fetch(
    "https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => displayFaceBox(calculateFaceLocation(result)))
    .catch((error) => console.log("error", error));

  return (
    <main className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <FaceRecognition box={formData.box} imageUrl={formData.imageUrl} />
        </>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} route={route} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </main>
  );
}

export default App;
