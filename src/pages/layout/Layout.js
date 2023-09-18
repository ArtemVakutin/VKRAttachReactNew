import React from 'react';
import {Outlet} from "react-router-dom";
import {MainMenu} from "./MainMenu";

export const Layout = () => {
    return <>
    <MainMenu/>
    <Outlet/>
    </>
}