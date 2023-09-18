import './App.css';
import axios from "axios";
import {DOMAIN_URL, GET_USER_URL} from "./constants/LinkConstants";
import {useEffect, useState} from "react";
import {SIMPLE_GLOBAL_ERROR} from "./constants/SimpleConstants";
import {DomainContext} from "./context/Contexts";
import {Layout} from "./components/Main";


export const App2 = () => {
    const [user, setUser] = useState(null);
    const [globalError, setGlobalError] = useState(null);
    const [domain, setDomain] = useState(null);
    const {departments, faculties, years, ranks, academictitles, academicdegrees, ranktypes} = domain || {};

    const fetchDomainData = () => {
        axios.get(`${DOMAIN_URL}`)
            .then(res => setDomain(res.data))
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setGlobalError(SIMPLE_GLOBAL_ERROR)
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser
                    // and an instance of http.ClientRequest in node.js
                    console.log(error.request);
                    setGlobalError(SIMPLE_GLOBAL_ERROR)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    setGlobalError(SIMPLE_GLOBAL_ERROR)
                }
            })
    }

    const fetchUser = () => {
        axios.get(`${GET_USER_URL}`)
            .then(res => setUser(res.data))
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setUser(null)
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser
                    // and an instance of http.ClientRequest in node.js
                    console.log(error.request);
                    setGlobalError(SIMPLE_GLOBAL_ERROR)
                    setUser(null)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    setGlobalError(SIMPLE_GLOBAL_ERROR)
                    setUser(null)
                }
            })
    }

    useEffect(() => fetchDomainData(), []);
    console.info(domain);

    useEffect(() => fetchUser(), []);
    console.info(domain);

    return (
        <DomainContext.Provider value={{departments, faculties, years, ranks, academictitles,
            academicdegrees, ranktypes, user, globalError, fetchDomainData, fetchUser, setGlobalError}}>
            {domain && <Layout/>}
        </DomainContext.Provider>)
}
