/**
 * Applies halftone dithering to mimic 1-bit graphics with high contrast and dot patterns.
 * @param {Uint8ClampedArray} pixels - The pixel data of the image.
 * @param {Object} options - Configuration options.
 * @param {number} options.width - Width of the image.
 * @param {number} options.height - Height of the image.
 * @param {Array<Array<number>>} options.palette - Color palette to use (must be binary: black and white).
 * @param {number} [options.scale=1] - Scale factor for the dithering effect.
 * @param {number} [options.dotSize=1] - Size of the dots in the grid (default: 1).
 * @param {number} [options.gridSize=4] - Size of the grid cells (default: 4).
 */
export function halftone(pixels, options) {
  const {
    width,
    height,
    palette,
    scale = 1,
    dotSize = 1,
    gridSize = 4,
  } = options;

  // Ensure the palette is binary (black and white)
  if (palette.length !== 2) {
    throw new Error(
      "Halftone dithering requires a binary palette (exactly 2 colors)."
    );
  }
  const [black, white] = palette;

  // Create a grid-based dithering pattern
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];

      // Convert to grayscale
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      // Determine the grid cell coordinates
      const gridX = Math.floor(x / gridSize);
      const gridY = Math.floor(y / gridSize);

      // Calculate the brightness threshold for this grid cell
      const brightnessThreshold = ((gridX + gridY) % 2) * 255 * scale;

      // Apply the halftone pattern
      if (gray > brightnessThreshold) {
        // Place a dot if the pixel falls within the dot size
        const localX = x % gridSize;
        const localY = y % gridSize;

        if (localX < dotSize && localY < dotSize) {
          pixels[index] = white[0];
          pixels[index + 1] = white[1];
          pixels[index + 2] = white[2];
        } else {
          pixels[index] = black[0];
          pixels[index + 1] = black[1];
          pixels[index + 2] = black[2];
        }
      } else {
        pixels[index] = black[0];
        pixels[index + 1] = black[1];
        pixels[index + 2] = black[2];
      }
    }
  }
}
