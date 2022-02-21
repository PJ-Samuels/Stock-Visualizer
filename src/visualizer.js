//react 3 components imports, function, return

import React, {useState} from 'react';
import env from 'react-dotenv'
require('dotenv').config()

export default function Visualizer(){



    function getData(){
            var axios = require("axios").default;

            var options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            function: 'TIME_SERIES_DAILY',
            symbol: 'MSFT',
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
                console.log(response.data);
        })
    }
    return(
        <div>
            hello
            <button onclick = {getData()} />
           
        </div>
    )
}