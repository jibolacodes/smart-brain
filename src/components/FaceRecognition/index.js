import "./FaceRecognition.css";

const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className="center">
      <img id="input-image" src={imageUrl} alt="" />
      <div
        className="bounding-box"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
};

export default FaceRecognition;
