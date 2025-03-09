import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";
import "./App.css"; // Import CSS file

const App = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [detailed, setDetailed] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false); // Track file upload status

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileUploaded(true); // Hide message when a file is uploaded

      const reader = new FileReader();
      reader.onload = (e) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(e.target.result, "text/xml");
        const geoJson = toGeoJSON.kml(kml);
        setGeoJsonData(geoJson);
        processGeoJson(geoJson);
      };
      reader.readAsText(file);
    }
  };

  const processGeoJson = (geoJson) => {
    const counts = {};
    const details = {};

    geoJson.features.forEach((feature) => {
      const type = feature.geometry.type;
      counts[type] = (counts[type] || 0) + 1;

      if (type.includes("LineString")) {
        const length = calculateLength(feature.geometry.coordinates);
        details[type] = (details[type] || 0) + length.toFixed(2);
      }
    });

    setSummary(counts);
    setDetailed(details);
  };

  const calculateLength = (coords) => {
    let totalLength = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      const [lon1, lat1] = coords[i];
      const [lon2, lat2] = coords[i + 1];
      totalLength += haversine(lat1, lon1, lat2, lon2);
    }
    return totalLength;
  };

  const haversine = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <div className="container">
      <h2>KML File Viewer</h2>

      {!fileUploaded && <p className="upload-message">📂 Please upload a KML file to view the data.</p>}

      <input type="file" accept=".kml" onChange={handleFileUpload} className="file-input" />

      <div className="button-group">
        {summary && (
          <button onClick={() => setShowSummary(!showSummary)}>Show Summary</button>
        )}
        {detailed && (
          <button onClick={() => setShowDetailed(!showDetailed)}>Show Detailed</button>
        )}
      </div>

      {showSummary && summary && (
        <div className="table-container">
          <h3>Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Geometry Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDetailed && detailed && (
        <div className="table-container">
          <h3>Detailed Information</h3>
          <table>
            <thead>
              <tr>
                <th>Geometry Type</th>
                <th>Total Length (km)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(detailed).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {geoJsonData && (
        <MapContainer center={[20, 78]} zoom={4} className="map-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON data={geoJsonData} />
        </MapContainer>
      )}
    </div>
  );
};

export default App;
