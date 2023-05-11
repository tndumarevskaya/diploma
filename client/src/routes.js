import AnimalPage from "./pages/AnimalPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import ShelterAnimalsPage from "./pages/ShelterAnimalsPage";
import ShelterProfilePage from "./pages/ShelterProfilePage";
import StartPage from "./pages/StartPage";
import { ANIMAL_ROUTE, APPLICATION_ROUTE, CHAT_ROUTE, LOGIN_ROURE, NOT_FOUND_PAGE, REISTRATION_ROURE, SHELTER_ROUTE, STARTPAGE_ROUTE, VOLUNTEER_ROUTE } from "./utils/const";

export const shelterRoutes = [
    {
        path: SHELTER_ROUTE + LOGIN_ROURE,
        Element: <AuthPage />
    },
    {
        path: SHELTER_ROUTE + REISTRATION_ROURE,
        Element: <AuthPage />
    },
    {
        path: SHELTER_ROUTE,
        Element: <ShelterProfilePage />
    },
    {
        path: SHELTER_ROUTE + ANIMAL_ROUTE,
        Element: <ShelterAnimalsPage />
    },
    {
        path: SHELTER_ROUTE + ANIMAL_ROUTE + '/:id',
        Element: <AnimalPage />
    },
    {
        path: SHELTER_ROUTE + VOLUNTEER_ROUTE + CHAT_ROUTE,
        Element: <ShelterAnimalsPage />
    },
    {
        path: SHELTER_ROUTE + VOLUNTEER_ROUTE + APPLICATION_ROUTE,
        Element: <ShelterAnimalsPage />
    }
]

export const volunteerRoutes = [ 
    {
        path: VOLUNTEER_ROUTE + LOGIN_ROURE,
        Element: <AuthPage/>
    },
    {
        path: VOLUNTEER_ROUTE + REISTRATION_ROURE,
        Element: <AuthPage/>
    }
]

export const publicRoutes = [
    {
        path: STARTPAGE_ROUTE,
        Element: <StartPage/>
    },
    {
        path: NOT_FOUND_PAGE,
        Element: <NotFoundPage/>
    }
]