# **dithe**

**dithe** is a lightweight JavaScript library for applying dithering effects to images. It supports various dithering algorithms (e.g., Floyd-Steinberg, Atkinson, Bayer) and allows users to apply custom or predefined color palettes (e.g., Game Boy, grayscale, sepia). The library is modular, making it easy to extend or customize.

---

## **Features**

- **Multiple Algorithms**: Supports popular dithering algorithms like Floyd-Steinberg, Atkinson, and Bayer.
- **Predefined Palettes**: Includes palettes such as Game Boy, grayscale, and sepia.
- **Customizable**: Users can define their own color palettes.
- **Modular Design**: Each algorithm is implemented in its own module for better maintainability and scalability.
- **Easy Integration**: Works seamlessly with HTML `<img>` elements and outputs a dithered image on an HTML `<canvas>`.

---

## **Installation**

### **From Source**
1. Clone the repository:
   ```bash
   git clone https://github.com/msudomoikin/dithe.git
   ```
2. Include the library in your project:
   ```html
   <script type="module" src="path/to/dithe.js"></script>
   ```

### **Using npm (Coming Soon)**

---

### **Basic Example**

```javascript
import { Dithe } from "./dithe.js";

const dither = new DitherJS();

const img = new Image();
img.src = "path/to/your/image.jpg";
img.onload = () => {
  const options = {
    algorithm: "floydSteinberg", // or "atkinson", "bayer"
    palette: "gameboy", // or "sepia", "grayscale", or custom palette
  };

  const ditheredCanvas = dither.applyDithering(img, options);
  document.body.appendChild(ditheredCanvas);
};
```
- **`applyDithering(img, options)`**
  - **Parameters**:
    - `img` (`HTMLImageElement`): The input image element.
    - `options` (`Object`): Configuration options for the dithering process.
  - **Returns**: An `HTMLCanvasElement` containing the dithered image.
---

## **Options**

The `applyDithering` method accepts an `options` object with the following properties:

| Option       | Type             | Description                                                                                   | Default Value |
|--------------|------------------|-----------------------------------------------------------------------------------------------|---------------|
| `algorithm`  | `"floydSteinberg"`, `"atkinson"`, `"bayer"` | The dithering algorithm to use.                                                               | `"floydSteinberg"` |
| `palette`    | `string` or `Array` | The color palette to use. Can be a predefined palette name (`"grayscale"`, `"gameboy"`, etc.) or a custom array of RGB colors. | `"grayscale"` |

---

### **Available Algorithms**

#### **1. Floyd-Steinberg**
- **Description**: A popular error-diffusion dithering algorithm that distributes quantization errors to neighboring pixels.
- **Best For**: General-purpose dithering with smooth gradients.
- **Options**:
  - `palette`: Any valid palette (predefined or custom).

#### **2. Atkinson**
- **Description**: Similar to Floyd-Steinberg but diffuses the error over more pixels, resulting in softer edges.
- **Best For**: Images where softer transitions are desired.
- **Options**:
  - `palette`: Any valid palette (predefined or custom).

#### **3. Bayer**
- **Description**: A simple ordered dithering algorithm that uses a Bayer matrix to determine pixel thresholds.
- **Best For**: Pixel art or low-color environments.
- **Options**:
  - `palette`: Any valid palette (predefined or custom).

#### **Algorithm-Specific Options**

You can pass additional configuration options for each algorithm using the `algorithmOptions` property.

- **Floyd-Steinberg**:
  - `rightFactor`: Error diffusion factor for the pixel to the right (default: `7/16`).
  - `bottomLeftFactor`: Error diffusion factor for the pixel to the bottom-left (default: `3/16`).
  - `bottomFactor`: Error diffusion factor for the pixel directly below (default: `5/16`).
  - `bottomRightFactor`: Error diffusion factor for the pixel to the bottom-right (default: `1/16`).

- **Atkinson**:
  - `factor`: Global error diffusion factor (default: `1/8`).

- **Bayer**:
  - `thresholdScale`: Scales the threshold values in the Bayer matrix (default: `1`).



---

### **Available Palettes**

| Palette Name   | Description                                                                                     | Example Colors (RGB)                          |
|----------------|-------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `"grayscale"`  | A simple black, gray, and white palette.                                                        | `[0, 0, 0]`, `[128, 128, 128]`, `[255, 255, 255]` |
| `"gameboy"`    | Mimics the classic Game Boy color scheme.                                                       | `[15, 56, 15]`, `[48, 98, 48]`, `[139, 172, 15]`, `[155, 188, 15]` |
| `"sepia"`      | A warm, vintage-style palette.                                                                  | `[0, 0, 0]`, `[112, 66, 20]`, `[168, 100, 30]`, `[255, 255, 255]` |

---

### **Custom Palettes**

You can define your own palette by passing an array of RGB arrays. For example:

```javascript
const customPalette = [
  [255, 0, 0], // Red
  [0, 255, 0], // Green
  [0, 0, 255], // Blue
];

const options = {
  algorithm: "floydSteinberg",
  palette: customPalette,
};

const ditheredCanvas = dither.applyDithering(img, options);
document.body.appendChild(ditheredCanvas);
```
---

## **Contributing**

We welcome contributions! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## **Acknowledgments**

- Inspired by the article ["Ditherpunk"](https://surma.dev/things/ditherpunk/) by Surma.
- Code was written with https://chat.qwen.ai/, prompted and corrected by me

---

## **Contact**

For questions, suggestions, or issues, feel free to reach out:

- GitHub: [Your GitHub Profile](https://github.com/msudomoikin)
