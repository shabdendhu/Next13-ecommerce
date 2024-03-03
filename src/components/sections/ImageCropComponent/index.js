import ReactCrop from "react-image-crop";

function CropDemo({ src }) {
  const [crop, setCrop] = useState();
  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      <img src={src} />
    </ReactCrop>
  );
}

export default CropDemo;
