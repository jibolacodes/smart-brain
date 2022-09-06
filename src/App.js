import { useState } from "react";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Rank from "./components/Rank";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";

function App() {
  const [formData, setFormData] = useState({
    input: "",
    imageUrl: "",
  });

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
      .then((result) =>
        console.log(
          JSON.parse(result).outputs[0].data.regions[0].region_info.bounding_box
        )
      )
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
      <FaceRecognition imageUrl={formData.imageUrl} />
    </main>
  );
}

export default App;
