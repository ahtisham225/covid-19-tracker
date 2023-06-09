// import logo from './logo.svg';
import React,  {useEffect, useState} from 'react';
import './App.css';
import { MenuItem, FormControl, Select,Card, CardContent} from "@mui/material";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
function App() {

  const [countries, setCountries] = useState([]);
  const [country,setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState(
    {
      lat: 34.80746, lng: -40.4796
    }
  );
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);  
  const [casesType, setCasesType] = useState("cases");
  
  
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country) => (
          {
            name: country.country, // Pakistan, United States
            value: country.countryInfo.iso2 // PK, USA
          }
        ));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };
    getCountriesData();

  }, []);
      

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  },[]);


  const onCountryChage = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" :`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).then(response => 
      
      response.json()).then(data => 
      {
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });

    };

  return (
    <div className="app">

      <div className="app__left">
        {/* Header */}
        <div className="app__header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange ={onCountryChage} value={country}>
            {/* Loop through all the countries and show a drop down list of the options */}
            <MenuItem className='dropdown__values' value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem className='dropdown__values' value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>  
        </FormControl>
        </div>
        {/* Title + Select input dropdown field */}


        {/* InfoBox */}
        <div className="app__stats">
          <InfoBox 
          active={casesType === "cases"}
          onClick={(e) => setCasesType("cases")}
          title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox 
          active={casesType === "recovered"}
          isRecovered = {true}
          onClick={(e) => setCasesType("recovered")}
          title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox 
          active={casesType === "deaths"}  
          onClick={(e) => setCasesType("deaths")}
          title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        
        {/* Map */}
        <Map
        countries={mapCountries}
        casesType={casesType}
        center={mapCenter}
        zoom = {mapZoom}
        />
      </div>
      <Card className="app__right">
        {/* Table */}
        <CardContent>
          <h3>All Cases by Country</h3>
          <Table countries={tableData}/>
          <h3 className='new__cases'>Worldwide new {casesType}</h3>
          <LineGraph
          casesType={casesType}/>
        </CardContent>
        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
