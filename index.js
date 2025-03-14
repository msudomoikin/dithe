import { DitherJS } from "./DitherJS.js";

const dither = new DitherJS();

const img = new Image();
img.src = "photo.png";
img.onload = () => {
  const options = {
    algorithm: "floydSteinberg", // or "atkinson", "bayer"
    palette: "gameboy", // or "sepia", "grayscale", or custom palette
  };

  const ditheredCanvas = dither.applyDithering(img, options);
  document.body.appendChild(ditheredCanvas);
};
