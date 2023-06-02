import React from "react";
import {MapContainer, TileLayer, useMap} from "react-leaflet";
import "./Map.css";

function MyComponent({center, zoom}){
    const map = useMap();
    map.setView(center, zoom);
    return null
    }
function Map({center, zoom}) {
    return(
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <MyComponent center={center} zoom={zoom}/>  
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            </MapContainer>
        </div>
    )
}   
export default Map;