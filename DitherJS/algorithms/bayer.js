export function bayer(pixels, width, height, palette, scale = 1, options = {}) {
  const thresholdScale = (options.thresholdScale || 1) * scale;

  const bayerMatrix = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const threshold = (bayerMatrix[y % 4][x % 4] / 16) * 255 * thresholdScale;

      const oldPixel = [pixels[index], pixels[index + 1], pixels[index + 2]];
      const newPixel = oldPixel.map((c) => (c > threshold ? 255 : 0));

      pixels[index] = newPixel[0];
      pixels[index + 1] = newPixel[1];
      pixels[index + 2] = newPixel[2];
    }
  }
}