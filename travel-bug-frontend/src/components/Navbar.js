import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isHost');
        localStorage.removeItem('token');
        navigate("/login");
    }

    const handleSwitchToHosting = (e) => {
        e.preventDefault();
        localStorage.setItem('isHost', true);
        navigate("/hostings");
    }

    const handleSwitchToClient = (e) => {
        e.preventDefault();
        localStorage.removeItem('isHost');
        navigate("/");
    }

    const handleMessages = (e) => {
        e.preventDefault();
        navigate("/messages");
    }

    const handleNotifications = (e) => {
        e.preventDefault();
        navigate('/notifications');
    }

    const handleBookings = (e) => {
        e.preventDefault();
        navigate('/bookings');
    }

    const handleAccount = (e) => {
        e.preventDefault();
        navigate('/account');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container">
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

                        {
                            !localStorage.getItem('token') ?
                                <form className="d-flex" role="button">
                                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                                    <Link className="btn btn-secondary mx-1" to="/login" role="button">Login</Link>
                                </form> : <form className="d-flex" role="button">
                                    {
                                        localStorage.getItem('isHost') ?
                                            <button className="btn btn-primary mx-1" onClick={handleSwitchToClient}>Switch to Client</button> :
                                            <button className="btn btn-primary mx-1" onClick={handleSwitchToHosting}>Switch to Hosting</button>
                                    }
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            User
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><button className="dropdown-item" onClick={handleMessages}>Messages</button></li>
                                            <li><button className="dropdown-item" onClick={handleNotifications}>Notifications</button></li>
                                            <li><button className="dropdown-item" onClick={handleBookings}>Bookings</button></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button className="dropdown-item" onClick={handleAccount}>Account</button></li>
                                            <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                        </ul>
                                    </div>
                                </form>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

