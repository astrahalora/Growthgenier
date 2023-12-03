import { Outlet, NavLink, useNavigate } from "react-router-dom";
import growthLogo from "../assets/images/growthgen_logo.png"

export default function Navigation() {
    const navigate = useNavigate();
    
    return <>
        <nav className="navbar navbar-expand-md sticky-top">
            <div className="container-fluid">
                <img role="button" className="navbar-brand" src={growthLogo} id="logo" alt="Growthgenier Logo" onClick={() => navigate("/")}/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto fw-bold">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" aria-current="page">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/projects" className="nav-link">Projects</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Outlet />
    </>
}