import axios from "axios";
import React from "react";
import {DOMAIN_URL, GET_ORDERS_FOR_USER} from "../constants/LinkConstants";

export const domainDataLoader = async () => {
    const {data} = await axios.get(`${DOMAIN_URL}`);
    const domainData = {
        departments: data.DEPARTMENT,
        faculties: data.FACULTY,
        years: data.YEAR,
        ranks: data.RANK,
        lecturerRanks: data.LECTURER_RANK,
        academicTitles: data.ACADEMIC_TITLE,
        academicDegrees: data.ACADEMIC_DEGREE,
        rankTypes: data.RANK_TYPE,
        lecturerPositions: data.LECTURER_POSITION,
        userPositions: data.USER_POSITION,
        user: null,
        globalError: null,
    }
    console.log("DOMAIN DATA IS")
    console.log(domainData)
    return domainData

}

export const userOrdersLoader = async () => {
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
    return data
}