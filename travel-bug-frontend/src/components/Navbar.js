import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Travel Bug</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/experiences">Experiences</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/transportguidelines">Transport Guidelines</Link>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>

                        {!localStorage.getItem('token') ? 
                            <form className="d-flex" role="button">
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                            <Link className="btn btn-secondary mx-1" to="/login" role="button">Login</Link>
                        </form> : <button className="btn btn-danger mx-1" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

