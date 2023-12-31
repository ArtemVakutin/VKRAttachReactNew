import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {Layout} from "./pages/layout/Layout";
import {AuthProvider} from "./hoc/AuthProvider";
import {Registration} from "./pages/authorization/Registration";
import React from "react";
import {CheckAuth} from "./pages/authorization/CheckAuth";
import PrivateRoute from "./hoc/PrivateRoute";
import {NotFoundPage} from "./pages/errors/Errors";
import {domainDataLoader} from "./loaders/loaders";
import axios from "axios";
import SignIn from "./pages/authorization/SignIn";
import UserPatchForm from "./pages/layout/UserPatchForm";
import PublicRoute from "./hoc/PublicRoute";
import UsersPage from "./pages/admin/UsersPage";
import OrdersPage from "./pages/admin/OrdersPage";
import ThemesPage from "./pages/admin/ThemesPage";
import LecturersPage from "./pages/admin/LecturersPage";
import LecturersModeratorPage from "./pages/moderator/LecturersModeratorPage";
import {ThemesModeratorPage} from "./pages/moderator/ThemesModeratorPage";
import OrdersModeratorPage from "./pages/moderator/OrdersModeratorPage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UploadPage from "./pages/admin/UploadPage";

axios.defaults.withCredentials = true;


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>} id="layout" loader={domainDataLoader}>
        <Route index element={<CheckAuth/>}/>
        <Route path="auth" element={<PublicRoute/>}>
            <Route path="" element={<SignIn/>}/>
            <Route path="regcomplete" element={<SignIn registrationComplete={true}/>}/>
            <Route path="registration" element={<Registration/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>


        <Route path="user" element={<PrivateRoute role="USER"/>}>
            <Route path="" element={<UserOrdersPage/>}/>
            <Route path="patch" element={<UserPatchForm/>}/>
            <Route path="docs" element={<p>ДОкументы</p>}/>
        </Route>

        <Route path="moderator" element={<PrivateRoute role="MODERATOR"/>}>
            <Route path="" element={<OrdersModeratorPage/>}/>
            <Route path="docs" element={<p>Moderator docs</p>}/>
            <Route path="lecturers" element={<LecturersModeratorPage/>}/>
            <Route path="themes" element={<ThemesModeratorPage/>}/>
        </Route>

        <Route path="admin" element={<PrivateRoute role="ADMIN"/>}>
            <Route path="" element={<OrdersPage/>}/>
            <Route path="users" element={<UsersPage/>}/>
            <Route path="themes" element={<ThemesPage/>}/>
            <Route path="lecturers" element={<LecturersPage/>}/>
            <Route path="addfiles" element={<UploadPage/>}/>
            <Route path="getfiles" element={<p>Our team</p>}/>
        </Route>

    </Route>
))

export const App = () => {
    return (
        // <Route>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
        // </Route>
    );
}