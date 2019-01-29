import axios from 'axios'
import React from 'react'

 export function getPlace(lat, long){
        return axios.get('https://api.opencagedata.com/geocode/v1/json?q='+lat+'+'+long+'&key=bb9808dc57e844269240ba2be3073c25')
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                // handle error

                console.log(error);
            });


    }

export function getWeather(lat, long){
    return axios.get('http://samples.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=b6907d289e10d714a6e88b30761fae22')
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            // handle error

            console.log(error);
        });


}

/*
let b = new ApiGetter();
export default b*/
