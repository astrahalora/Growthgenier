import { Outlet, NavLink } from "react-router-dom";
import growthLogo from "../assets/images/growthgen_logo.png"

export default function Navigation() {
    return <>
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                <img className="navbar-brand" src={growthLogo} id="logo" alt="Growthgenier Logo"/>
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