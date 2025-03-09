# KML File Viewer

KML File Viewer is a React-based application that allows users to upload and visualize KML files on an interactive map using Leaflet. It also provides a summary of geometry types and calculates the total length of LineString geometries.

## Features
- Upload KML files and convert them to GeoJSON.
- Visualize GeoJSON data on a Leaflet map.
- Display a summary of geometry types and their counts.
- Calculate and display the total length of LineString geometries.

## Technologies Used
- React
- Leaflet
- @tmcw/togeojson
- JavaScript (ES6+)
- HTML & CSS

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/kml-file-viewer.git
   cd kml-file-viewer
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Usage
1. Click on the file input to upload a `.kml` file.
2. View the map with the uploaded data.
3. Click "Show Summary" to see the count of geometry types.
4. Click "Show Detailed" to view the total length of LineString geometries.

## Folder Structure
```
📂 kml-file-viewer
 ├── 📂 src
 │   ├── 📜 App.js
 │   ├── 📜 index.js
 │   ├── 📜 App.css
 ├── 📜 package.json
 ├── 📜 README.md
```

## Dependencies
- `react`
- `react-leaflet`
- `@tmcw/togeojson`
- `leaflet`

## License
This project is licensed under the MIT License.

## Author
Developed by [Your Name](https://github.com/your-username).
