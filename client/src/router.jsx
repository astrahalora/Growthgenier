import { createBrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import ProjectList from "./pages/ProjectList";
import ErrorPage from "./pages/ErrorPage";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";

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
                element: <Project />
            },
            {
                path: "/projects",
                element: <ProjectList />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])