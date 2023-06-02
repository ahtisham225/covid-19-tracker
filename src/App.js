// import logo from './logo.svg';
import React,  {useEffect, useState} from 'react';
import './App.css';
import { MenuItem, FormControl, Select } from "@mui/material";
function App() {

  const [countries, setCountries] = useState([]);
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
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);
      



  return (
    <div className="app">
      
      
      {/* Header */}
      <div className="app__header">
      <h1>Covid 19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value="abc">
          {/* Loop through all the countries and show a drop down list of the options */}
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
      {/* InfoBox */}
      {/* InfoBox */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}
      {/* Footer */}
    </div>
  );
}

export default App;
