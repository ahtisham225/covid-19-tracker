import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import numeral from "numeral";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    Legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};
function LineGraph() {

const [dataGraph,setDataGraph] = useState({});


const buildChartData = (data, casesType='cases') => { 
    const chartData = [];
    let lastDataPoint;
    for(let date in data.cases){
        if(lastDataPoint > 0 ){
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
        // console.log(lastDataPoint);
        // console.log('ahtisham');
    }
    console.log('ChartData')
    console.log(chartData)
    return chartData;
}  


useEffect(() => {
    const fetchData = async () => {
    await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120").then(
        response => response.json()).then(data => {
            console.log('ahtisham')
            console.log(data);
            const chartData = buildChartData(data);
            console.log('han')
            setDataGraph(chartData);
        });
    };
    fetchData();
},[]);

  return (
    <div>
        {dataGraph?.length > 0 && (
        <Line 
        options={options}
        data={{
            datasets: [
                {
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                    data: dataGraph,
                },
            ],
        }}/>
        )}
    </div>
  )
}

export default LineGraph;