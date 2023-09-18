import {createContext} from "react";

export const AuthContext = createContext(null);
export const DomainContext = createContext({
    departments: [],
    faculties: [],
    years: [],
    ranks:[],
    academictitles:[],
    academicdegrees:[],
    ranktypes:[],
    user: null,
    globalError: null,
    getDomainData: ()=>{}
})