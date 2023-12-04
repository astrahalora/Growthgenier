import { createBrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile";
import Project from "./pages/CurrentProject";
import ProjectList from "./pages/ProjectList";
import ErrorPage from "./pages/ErrorPage";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import ProjectForm from "./components/ProjectForm";
import ProjectTable from "./components/ProjectTable";
import CurrentProject from "./pages/CurrentProject";

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
                element: <ProjectForm />
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
                path: "*",
                element: <NotFound />
            }
        ]
    }
])