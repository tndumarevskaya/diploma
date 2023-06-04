import AnimalPage from "./pages/AnimalPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import ShelterAdopter from "./pages/Shelter/ShelterAdopter";
import ShelterAnimalsPage from "./pages/Shelter/ShelterAnimalsPage";
import ShelterDonation from "./pages/Shelter/ShelterDonation";
import ShelterProfilePage from "./pages/Shelter/ShelterProfilePage";
import ShelterVolunteer from "./pages/Shelter/ShelterVolunteer";
import ShelterInfoPage from "./components/ShelterInfoComponent";
import StartPage from "./pages/StartPage";
import VolunteerChatPage from "./pages/Volunteer/VolunteerChatPage";
import VolunteerEducationPage from "./pages/Volunteer/VolunteerEducationPage";
import VolunteerProfilePage from "./pages/Volunteer/VolunteerProfilePage";
import VolunteerShelterPage from "./pages/Volunteer/VolunteerShelterPage";
import { ADOPTER_ROUTE, ANIMAL_CATALOG_ROUTE, ANIMAL_ROUTE, APPLICATION_ROUTE, CATS_ROUTE, CHAT_ROUTE, DOGS_ROUTE, DONATION_ROUTE, EDUCATION_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE, NOT_FOUND_PAGE, REGISTRATION_ROUTE, SHELTERS_ROUTE, SHELTER_ROUTE, STARTPAGE_ROUTE, VOLUNTEER_ROUTE } from "./utils/const";
import AnimalCatalogPage from "./pages/AnimalCatalogPage";
import AnimalsSearch from "./pages/AnimalsSearch";
import SheltersSearch from "./pages/SheltersSearch";
import AnimalVolunteerPage from "./pages/Volunteer/AnimalVolunteerPage";
import AnimalProfilePage from "./pages/AnimalProfilePage";
import ShelterPage from "./pages/ShelterPage";
import FavoritePage from "./pages/Adopter/FavoritePage";
import AdopterProfilePage from "./pages/Adopter/AdopterProfilePage";

export const shelterRoutes = [
    
    {
        path: SHELTER_ROUTE + REGISTRATION_ROUTE,
        Element: <AuthPage />
    },
    {
        path: SHELTER_ROUTE + LOGIN_ROUTE,
        Element: <AuthPage />
    },
    {
        path: SHELTER_ROUTE + '/:id',
        Element: <ShelterProfilePage />
    },
    {
        path: SHELTER_ROUTE + '/:id'+ ANIMAL_ROUTE,
        Element: <ShelterAnimalsPage />
    },
    {
        path: SHELTER_ROUTE + '/:id' + ANIMAL_ROUTE + '/:animal_id',
        Element: <AnimalPage />
    },
    {
        path: SHELTER_ROUTE + '/:id' + VOLUNTEER_ROUTE + CHAT_ROUTE,
        Element: <ShelterVolunteer />
    },
    {
        path: SHELTER_ROUTE + '/:id' + VOLUNTEER_ROUTE + CHAT_ROUTE + '/:chat_id',
        Element: <ShelterVolunteer />
    },
    {
        path: SHELTER_ROUTE + '/:id' + VOLUNTEER_ROUTE + APPLICATION_ROUTE,
        Element: <ShelterVolunteer />
    },
    {
        path: SHELTER_ROUTE + '/:id' + ADOPTER_ROUTE + CHAT_ROUTE,
        Element: <ShelterAdopter />
    },
    {
        path: SHELTER_ROUTE + '/:id' + ADOPTER_ROUTE + CHAT_ROUTE + '/:chat_id',
        Element: <ShelterAdopter />
    },
    {
        path: SHELTER_ROUTE + '/:id' + ADOPTER_ROUTE + APPLICATION_ROUTE,
        Element: <ShelterAdopter />
    },
    {
        path: SHELTER_ROUTE + '/:id' + DONATION_ROUTE,
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
        path: VOLUNTEER_ROUTE + '/:id',
        Element: <VolunteerProfilePage />
    },
    {
        path: VOLUNTEER_ROUTE + '/:id' + SHELTER_ROUTE,
        Element: <VolunteerShelterPage />
    },
    {
        path: VOLUNTEER_ROUTE + '/:id' + ANIMAL_ROUTE + "/:animal_id",
        Element: <AnimalVolunteerPage/>
    },
    {
        path: VOLUNTEER_ROUTE + '/:id' + CHAT_ROUTE,
        Element: <VolunteerChatPage />
    },
    {
        path: VOLUNTEER_ROUTE + '/:id' + CHAT_ROUTE + '/:chat_id',
        Element: <VolunteerChatPage />
    },
    {
        path: VOLUNTEER_ROUTE + '/:id' + EDUCATION_ROUTE,
        Element: <VolunteerEducationPage />
    },
    {
        path: VOLUNTEER_ROUTE + '/:id' + EDUCATION_ROUTE + '/:education_id',
        Element: <VolunteerEducationPage />
    },
]

export const adopterRoutes = [
    {
        path: ADOPTER_ROUTE + LOGIN_ROUTE,
        Element: <AuthPage/>
    },
    {
        path: ADOPTER_ROUTE + REGISTRATION_ROUTE,
        Element: <AuthPage/>
    },
    {
        path: FAVORITE_ROUTE,
        Element: <FavoritePage/>
    },
    {
        path: ADOPTER_ROUTE + '/:id',
        Element: <AdopterProfilePage/>
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
    },
    {
        path: ANIMAL_CATALOG_ROUTE,
        Element: <AnimalCatalogPage/>
    },
    {
        path: CATS_ROUTE,
        Element: <AnimalsSearch/>
    },
    {
        path: DOGS_ROUTE,
        Element: <AnimalsSearch/>
    },
    {
        path: SHELTERS_ROUTE,
        Element: <SheltersSearch/>
    },
    {
        path: ANIMAL_ROUTE + "/:animal_id",
        Element: <AnimalProfilePage />
    },
    {
        path: SHELTERS_ROUTE + "/:shelter_id",
        Element: <ShelterPage />
    }
]