import {createContext} from "react";

export const AuthContext = createContext(null);
export const DomainContext = createContext({
    departments: [],
    faculties: [],
    years: [],
    ranks:[],
    lecturerRanks:[],
    academicTitles:[],
    academicDegrees:[],
    rankTypes:[],
    lecturerPositions:[],
    userPositions:[],
    user: null,
    globalError: null,
    })