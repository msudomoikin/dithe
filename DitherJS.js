// DitherJS.js
import { floydSteinberg } from "./algorithms/floydSteinberg.js";
import { atkinson } from "./algorithms/atkinson.js";
import { bayer } from "./algorithms/bayer.js";
import { PALLETES } from "./palettes.js";

export class DitherJS {
  constructor() {
    this.palettes = PALLETES;
    this.defaultPalette = "grayscale";
    this.defaultAlgorithm = "floydSteinberg";
  }

  /**
   * Applies dithering to an image.
   * @param {HTMLImageElement} img - The input image element.
   * @param {Object} options - Configuration options.
   * @param {string} options.algorithm - Dithering algorithm to use.
   * @param {string|Array} options.palette - Color palette to use.
   * @returns {HTMLCanvasElement} - Canvas with the dithered image.
   */
  applyDithering(img, options = {}) {
    const algorithm = options.algorithm || this.defaultAlgorithm;
    const palette = Array.isArray(options.palette)
      ? options.palette
      : this.palettes[options.palette || this.defaultPalette];

    if (!palette) {
      throw new Error("Invalid palette specified.");
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    switch (algorithm) {
      case "floydSteinberg":
        floydSteinberg(pixels, canvas.width, canvas.height, palette);
        break;
      case "atkinson":
        atkinson(pixels, canvas.width, canvas.height, palette);
        break;
      case "bayer":
        bayer(pixels, canvas.width, canvas.height, palette);
        break;
      default:
        throw new Error("Unsupported dithering algorithm.");
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }
}
