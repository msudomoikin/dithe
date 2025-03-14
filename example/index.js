import { Dithe } from "../Dithe/Dithe.js";

const dither = new Dithe();
const params = document.createElement("div");
params.classList.add("params-note");

const img = new Image();
img.src = "./images/shop.jpg";

img.onload = () => {
  const options = {
    algorithm: "bayer",
    palette: "sepia",
    algorithmOptions: {
      thresholdScale: .727, //bayer
      factor: 1, //atkinson
      
      //floyd
      rightFactor: .1,
      bottomLeftFactor: 11.911,
      bottomFactor: .1,
      bottomRightFactor: 21.1,
    },
    scale: .65,
  };

  const ditheredCanvas = dither.applyDithering(img, options);
  params.textContent = JSON.stringify(options);
  
  document.body.appendChild(params);
  document.body.appendChild(ditheredCanvas);
};
