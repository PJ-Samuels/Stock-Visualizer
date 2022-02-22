//react 3 components imports, function, return

import React, {useState} from 'react';
import env from 'react-dotenv'
import Plot from 'react-plotly.js';

// require('dotenv').config()

export default function Visualizer(){
    const [prices, setPrices] = useState([])
    const [date, setDate] = useState([])

    function cleanData(data){
        const stock = data["Time Series (Daily)"]
        let stock_price = []
        let stock_date = []
        for (const [key, value] of Object.entries(stock)) {
            stock_price.push(value['4. close'])
            stock_date.push(key)
          }
        console.log(stock_price)
        console.log(stock_date)
        setPrices(stock_price)
        setDate(stock_date)
    }
    function getData(company){
        console.log(company)
            var axios = require("axios").default;

            var options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            function: 'TIME_SERIES_DAILY',
            symbol: company,
            outputsize: 'compact',
            datatype: 'json'
        },
        headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key': env.API_KEY
        }
        };
        axios.request(options)
            .then(function (response) {

                cleanData(response.data)
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        getData(event.target[0].value)
      }
    return(
        <div>
            hello
            <form onSubmit={handleSubmit}> 
                    Which company do you want to see?
                    <input type="text"/>
                    <input type="submit" value="Submit"/>
            
            </form>
            <Plot
            data={[
            {
                x: date, 
                y: prices,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
            },
            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
            ]}
            layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
        />
        </div>
    )
}