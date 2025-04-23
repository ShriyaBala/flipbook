# PDF Flipbook

A web application that converts PDF documents into an interactive flipbook with advertisements.

## Features

- Interactive PDF flipbook with page-turning animations
- Advertisement sidebar that rotates between images and videos
- Responsive design that works on desktop and mobile devices
- Keyboard navigation (left/right arrow keys)
- Page navigation controls

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/pdf-flipbook.git
   cd pdf-flipbook
   ```

2. Prepare your PDF content:
   - Convert your PDF pages to images (JPG or PNG format)
   - Place the images in a directory named `pages/`
   - Update the `totalContentPages` value in `script.js` to match your number of pages

3. Add your advertisements:
   - Place ad images in the `ads/` directory
   - Place video ads in the `ads/` directory
   - Update the `ads` array in `script.js` with your ad information

4. Open the project:
   - For development: Use a local server (e.g., Live Server in VS Code)
   - For production: Deploy to your web hosting service

## Customization

### Changing the Flipbook Appearance

Edit the `style.css` file to customize:
- Colors
- Fonts
- Layout dimensions
- Responsive breakpoints

### Modifying Ad Rotation

In `script.js`, you can adjust:
- `adRotationInterval`: How often ads rotate (in milliseconds)
- Ad types and sources in the `ads` array

## How to Convert PDF to Images

1. Use a PDF to image converter tool (online or desktop)
2. Save each page as a separate image
3. Name the images sequentially (e.g., 1.jpg, 2.jpg, etc.)
4. Place them in the `pages/` directory

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Turn.js](https://github.com/blasten/turn.js) - The flipbook library used in this project
- [Font Awesome](https://fontawesome.com/) - For the navigation icons 