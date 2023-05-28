import AnimalPage from "./pages/AnimalPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import ShelterAdopter from "./pages/Shelter/ShelterAdopter";
import ShelterAnimalsPage from "./pages/Shelter/ShelterAnimalsPage";
import ShelterDonation from "./pages/Shelter/ShelterDonation";
import ShelterProfilePage from "./pages/Shelter/ShelterProfilePage";
import ShelterVolunteer from "./pages/Shelter/ShelterVolunteer";
import StartPage from "./pages/StartPage";
import VolunteerChatPage from "./pages/Volunteer/VolunteerChatPage";
import VolunteerEducationPage from "./pages/Volunteer/VolunteerEducationPage";
import VolunteerProfilePage from "./pages/Volunteer/VolunteerProfilePage";
import VolunteerShelterPage from "./pages/Volunteer/VolunteerShelterPage";
import { ADOPTER_ROUTE, ANIMAL_ROUTE, APPLICATION_ROUTE, CHAT_ROUTE, DONATION_ROUTE, EDUCATION_ROUTE, LOGIN_ROUTE, NOT_FOUND_PAGE, REGISTRATION_ROUTE, SHELTER_ROUTE, STARTPAGE_ROUTE, VOLUNTEER_ROUTE } from "./utils/const";

export const shelterRoutes = [
    
    {
        path: SHELTER_ROUTE + REGISTRATION_ROUTE,
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
        Element: <ShelterVolunteer />
    },
    {
        path: SHELTER_ROUTE + VOLUNTEER_ROUTE + CHAT_ROUTE + '/:id',
        Element: <ShelterVolunteer />
    },
    {
        path: SHELTER_ROUTE + VOLUNTEER_ROUTE + APPLICATION_ROUTE,
        Element: <ShelterVolunteer />
    },
    {
        path: SHELTER_ROUTE + ADOPTER_ROUTE + CHAT_ROUTE,
        Element: <ShelterAdopter />
    },
    {
        path: SHELTER_ROUTE + ADOPTER_ROUTE + CHAT_ROUTE + '/:id',
        Element: <ShelterAdopter />
    },
    {
        path: SHELTER_ROUTE + ADOPTER_ROUTE + APPLICATION_ROUTE,
        Element: <ShelterAdopter />
    },
    {
        path: SHELTER_ROUTE + DONATION_ROUTE,
        Element: <ShelterDonation />
    },
]

export const volunteerRoutes = [ 
    {
        path: VOLUNTEER_ROUTE + LOGIN_ROUTE,
        Element: <AuthPage />
    },
    {
        path: VOLUNTEER_ROUTE + REGISTRATION_ROUTE,
        Element: <AuthPage />
    },
    {
        path: VOLUNTEER_ROUTE,
        Element: <VolunteerProfilePage />
    },
    {
        path: VOLUNTEER_ROUTE + SHELTER_ROUTE,
        Element: <VolunteerShelterPage />
    },
    {
        path: VOLUNTEER_ROUTE + CHAT_ROUTE,
        Element: <VolunteerChatPage />
    },
    {
        path: VOLUNTEER_ROUTE + CHAT_ROUTE + '/:id',
        Element: <VolunteerChatPage />
    },
    {
        path: VOLUNTEER_ROUTE + EDUCATION_ROUTE,
        Element: <VolunteerEducationPage />
    },
    {
        path: VOLUNTEER_ROUTE + EDUCATION_ROUTE + '/:id',
        Element: <VolunteerEducationPage />
    },
]

export const publicRoutes = [
    {
        path: STARTPAGE_ROUTE,
        Element: <StartPage/>
    },
    {
        path: SHELTER_ROUTE + LOGIN_ROUTE,
        Element: <AuthPage />
    },
    {
        path: NOT_FOUND_PAGE,
        Element: <NotFoundPage/>
    },
    {
        path: ANIMAL_ROUTE + "/:id",
        Element: <AnimalPage/>
    },
]