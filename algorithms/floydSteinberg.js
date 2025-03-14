// algorithms/floydSteinberg.js
export function floydSteinberg(pixels, width, height, palette) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const oldPixel = [pixels[index], pixels[index + 1], pixels[index + 2]];
        const newPixel = findClosestColor(oldPixel, palette);
  
        pixels[index] = newPixel[0];
        pixels[index + 1] = newPixel[1];
        pixels[index + 2] = newPixel[2];
  
        const quantError = [
          oldPixel[0] - newPixel[0],
          oldPixel[1] - newPixel[1],
          oldPixel[2] - newPixel[2],
        ];
  
        adjustPixel(pixels, x + 1, y, quantError, 7 / 16, width, height);
        adjustPixel(pixels, x - 1, y + 1, quantError, 3 / 16, width, height);
        adjustPixel(pixels, x, y + 1, quantError, 5 / 16, width, height);
        adjustPixel(pixels, x + 1, y + 1, quantError, 1 / 16, width, height);
      }
    }
  }
  
  function findClosestColor(color, palette) {
    let closest = palette[0];
    let minDistance = Infinity;
  
    for (const paletteColor of palette) {
      const distance =
        (color[0] - paletteColor[0]) ** 2 +
        (color[1] - paletteColor[1]) ** 2 +
        (color[2] - paletteColor[2]) ** 2;
  
      if (distance < minDistance) {
        minDistance = distance;
        closest = paletteColor;
      }
    }
  
    return closest;
  }
  
  function adjustPixel(pixels, x, y, quantError, factor, width, height) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const index = (y * width + x) * 4;
      pixels[index] += quantError[0] * factor;
      pixels[index + 1] += quantError[1] * factor;
      pixels[index + 2] += quantError[2] * factor;
    }
  }