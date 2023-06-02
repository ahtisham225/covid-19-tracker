// import logo from './logo.svg';
import React,  {useEffect, useState} from 'react';
import './App.css';
import { MenuItem, FormControl, Select,Card, CardContent} from "@mui/material";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
function App() {

  const [countries, setCountries] = useState([]);
  const [country,setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
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
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>  
        </FormControl>
        </div>
        {/* Title + Select input dropdown field */}


        {/* InfoBox */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        
        {/* Map */}
        <Map/>
      </div>
      <Card className="app__right">
        {/* Table */}
        <CardContent>
          <h3>All Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
        </CardContent>
        <LineGraph/>
        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
