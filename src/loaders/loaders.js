import axios from "axios";
import React from "react";
import {DOMAIN_URL, GET_ORDERS_FOR_USER} from "../constants/LinkConstants";

export const domainDataLoader = async ({request, params}) => {
    const {data} = await axios.get(`${DOMAIN_URL}`);
    return data
    // .then(res => res.data)
    // .catch(error => {
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser
    //         // and an instance of http.ClientRequest in node.js
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('Error', error.message);
    //     }
    // })
}

export const userOrdersLoader = async ({request, params}) => {
    let data = [];
    await axios.get(GET_ORDERS_FOR_USER).then((response) => data = response.data)
        .catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                data = []
            } else if (err.request) {
                console.log("SERVER IS NOT AVAILABLE")
            } else {
                console.log(err)
            }
        })
    console.log(data)
    return data
    // .then(res => res.data)
    // .catch(error => {
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser
    //         // and an instance of http.ClientRequest in node.js
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('Error', error.message);
    //     }
    // })
}