import { DitherJS } from "../DitherJS/DitherJS.js";

const dither = new DitherJS();
const params = document.createElement("div");
params.classList.add("params-note");

const img = new Image();
img.src = "example2.png";
img.onload = () => {
  const options = {
    // algorithm: "floydSteinberg",
    algorithm: "bayer",
    palette: "grayscale",
    scale: .8 // Reduce the intensity of the dithering effect
  };

  const ditheredCanvas = dither.applyDithering(img, options);
  params.textContent = JSON.stringify(options);
  document.body.appendChild(params);
  document.body.appendChild(ditheredCanvas);
};
