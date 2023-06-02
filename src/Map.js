import React from "react";
import {MapContainer, TileLayer, useMap} from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function MyComponent({center, zoom}){
    const map = useMap();
    map.setView(center, zoom);
    return null
    }
function Map({countries,casesType, center, zoom}) {
    return(
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <MyComponent center={center} zoom={zoom}/>  
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attributes='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, "cases")}
            </MapContainer>
        </div>
    )
}   
export default Map;