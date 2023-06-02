import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import "./Map.css";

function Map({center, zoom}) {
    return(
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright;>OpenStreetMap</a>"
                />
            </MapContainer>
        </div>
    )
}   
export default Map;