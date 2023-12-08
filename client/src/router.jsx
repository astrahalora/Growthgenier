import { createBrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile";
import ProjectList from "./pages/ProjectList";
import ErrorPage from "./pages/ErrorPage";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import ProjectCreator from "./pages/ProjectCreator";
import CurrentProject from "./pages/CurrentProject";
import SelectedProject from "./pages/SelectedProject";

export const router = createBrowserRouter([
    {   
        path: "/",
        element: <Navigation />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Profile />
            },
            {
                path: "/new-project",
                element: <ProjectCreator />
            },
            {
                path: "/current-project",
                element: <CurrentProject/>
            },
            {
                path: "/projects",
                element: <ProjectList />
            },
            {
                path: "/project",
                element: <SelectedProject />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])