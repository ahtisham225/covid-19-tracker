import numeral from "numeral";
import React from "react";
// import numeral from "numeral";
import {Circle, Popup} from "react-leaflet";
import './Map.css';
// Dictionary for cases type colors
const casesTypeColors = {
  "cases": {
    hex: "#8B8000",
    multiplier: 80,
  },
  "recovered": {
    hex: "#7dd71d",
    multiplier: 120,
  },
  "deaths": {
    hex: "#fb4443",
    multiplier: 200,
  },
};

export const sortData = (data) => {
    const sortedData = [...data];
        sortedData.sort((a,b) => {
            if(a.cases > b.cases){
                return -1;
            }else{
                return 1;
            }
        });
        return sortedData;
    };

// Draw Circles on Map with interactive tooltip
// const [casesType, setCasesType] = useState("cases");
export const showDataOnMap = (data, casesType) => (
    // setCasesType(casesType),
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}    
            fillOpacity={0.4}
            pathOptions={{color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex }}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
        <Popup>
            <div className="info-container">
                <div className="info-flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
                <div className="info-name"><strong>{country.country}</strong></div>
                <div className="info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                <div></div>
            </div>
        </Popup>
        </Circle>

    ))
);
