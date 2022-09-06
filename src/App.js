// import { useState } from "react";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Rank from "./components/Rank";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";

function App() {
  // const [formData, setFormData] = useState("");

  const handleInputChange = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = () => {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: "jibolacodes",
        app_id: "my-first-application",
      },
      inputs: [
        {
          data: {
            image: {
              url: "https://samples.clarifai.com/metro-north.jpg",
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
      .then((result) => console.log(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  return (
    <main className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <FaceRecognition />
    </main>
  );
}

export default App;
