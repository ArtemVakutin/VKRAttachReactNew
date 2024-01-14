import React, {useEffect, useState} from 'react';
import {AuthContext} from "../context/Contexts";
import {GET_USER_URL, LOGOUT_URL} from "../constants/LinkConstants";
import axios from "axios";
import {deleteTokens} from "../pages/authorization/JwtAxiosAuthenticationProps";


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        await axios.get(`${GET_USER_URL}`).then((res) => {
            setUser(res.data);
            setError(null);
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                setUser(null);
                setError(err.response.data)
            } else if (err.request) {
                console.log(err.request)
                setUser(null);
                setError("SERVER IS NOT AVAILABLE")
            } else {
                setUser(null);
                setError("Что-то пошло не так, но это когда-нибудь поправят")
            }

        })
    }

    const logout = async () => {
        await axios.post(LOGOUT_URL).then(() => {
            setUser(null);
            setError(null)
            deleteTokens()
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        const fetchUserUseEffect = async () => {
            await axios.get(`${GET_USER_URL}`).then((res) => {
                setUser(res.data);
                setError(null);
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    setUser(null);
                    setError(err.response.data)
                } else if (err.request) {
                    console.log(err.request)
                    setUser(null);
                    setError("SERVER IS NOT AVAILABLE")
                }  else {
                    setUser(null);
                    setError("Что-то пошло не так, но это когда-нибудь поправят")
                }

            })
        }
        fetchUserUseEffect();
    }, []);




    const value = {user, error, fetchUser, logout};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}