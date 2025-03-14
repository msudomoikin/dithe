import { DitherJS } from "../DitherJS/DitherJS.js";

const dither = new DitherJS();
const params = document.createElement("div");
params.classList.add("params-note");

const img = new Image();
img.src = "./images/CAR.jpg";
img.onload = () => {
  const options = {
    algorithm: "bayer",
    palette: "sepia",
    algorithmOptions: {
      thresholdScale: 16.727, //bayer
      factor: 2, //atkinson
      
      //floyd
      rightFactor: .1,
      bottomLeftFactor: 11.911,
      bottomFactor: .1,
      bottomRightFactor: 21.1,
    },
    scale: .058912424131313222599999,
  };
  const ditheredCanvas = dither.applyDithering(img, options);
  params.textContent = JSON.stringify(options);
  document.body.appendChild(params);
  document.body.appendChild(ditheredCanvas);
};
