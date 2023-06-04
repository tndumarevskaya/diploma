import React from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {shelterRoutes, publicRoutes, volunteerRoutes, adopterRoutes} from "../routes";
import { NOT_FOUND_PAGE, SHELTER_ROUTE, STARTPAGE_ROUTE } from '../utils/const';
import { useSelector } from 'react-redux';

const AppRouter = () => {
    return (
        <Routes>
            {shelterRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={Element} exact/>
            )}
            {volunteerRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={Element} exact/>
            )}
            {adopterRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={Element} exact/>
            )}
            {publicRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={Element} exact/>
            )}
            <Route path="*" element={<Navigate replace to={NOT_FOUND_PAGE}/>}/>
        </Routes>
    );
}

export default AppRouter;