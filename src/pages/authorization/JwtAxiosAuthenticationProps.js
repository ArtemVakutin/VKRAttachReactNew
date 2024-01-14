import React from 'react';
import axios from "axios";
import {TOKEN_PROCESSING_URL} from "../../constants/LinkConstants";

axios.defaults.withCredentials = true;

const setAccessToken = (accessToken) => {
    axios.defaults.withCredentials = true;
    if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
};

const handleAuthentication = async (accessToken) => {
    sessionStorage.setItem("accessToken", accessToken.accessToken);
    sessionStorage.setItem("accessTokenExpiry", accessToken.accessTokenExpiry);
};

const instance = axios.create();
instance.defaults.withCredentials = true;

export const deleteTokens = async () => {
    console.log("УДАЛЯЕМ ТОКЕНЫ")
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("accessTokenExpiry")
};

export const checkAndRefreshToken = async () => {
    console.log("ЗАПРАШИВАЕМ ТОКЕН")

    const dateNow = new Date();
    const dateObject = new Date(sessionStorage.getItem("accessTokenExpiry"));
    const different = (dateNow - dateObject) > 10000;

    if (dateObject != null && different) {
        return;
    } else {
        await axios.post(TOKEN_PROCESSING_URL)
            .then(resp => handleAuthentication(resp.data))
            .catch(ex => console.log(ex))
    }
};

axios.interceptors.request.use(
    async (config) => {

        const dateNow = new Date;
        const dateObject = new Date(sessionStorage.getItem("accessTokenExpiry"));
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken != null && dateObject != null && dateObject > dateNow) {
            config.headers['Authorization'] = `Bearer ${accessToken}` ;
            return config;
        } else {
            try {
                const response = await fetch(TOKEN_PROCESSING_URL, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    sessionStorage.setItem("accessToken", data.accessToken);
                    sessionStorage.setItem("accessTokenExpiry", data.accessTokenExpiry);
                    config.headers['Authorization'] = `Bearer ${data.accessToken}`;
                }
            } catch (fetchError) {
                console.log("Ошибка при обновлении токена:", fetchError);
            }



            // try {
            //     const resp = await instance.post("http://localhost:8080/jwt/refresh");
            //     sessionStorage.setItem("accessToken", resp.data.accessToken);
            //     sessionStorage.setItem("accessTokenExpiry", resp.data.accessTokenExpiry);
            //     config.headers['Authorization'] = `Bearer ${resp.data.accessToken}` ;
            //     return config;
            //
            // } catch (error) {
            //     if(error.response.status === 403) {
            //         sessionStorage.removeItem("accessToken")
            //         sessionStorage.removeItem("accessTokenExpiry")
            //         return config
            //     }
            //     console.log("AUTH ERROR");
            //     // throw error;
            //     return config;
            // }

        }
        // config.headers['Authorization'] = 'some-value';
        console.log('Перехватчик запросов: Запрос отправлен');
        // return config;
        return config;
    },
    // (error) => {
    //     // Обработка ошибок запроса
    //     console.error('Перехватчик запросов: Ошибка запроса', error);
    //     console.log("AUTH ERROR");
    //     return Promise.reject(error);
    // }
);


const JwtAxiosAuthenticationProps = ({children}) => {

    return <>
        {children}
    </>
}
export default JwtAxiosAuthenticationProps