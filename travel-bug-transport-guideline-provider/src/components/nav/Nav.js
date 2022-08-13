import React, { useContext, useEffect } from 'react';
import { Button, Navbar, NavbarBrand, NavItem } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import '../../App.css';
import userContext from '../../context/user/userContext';
const Nav = () => {
    const context = useContext(userContext);
    const { user, getUser } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
        }
    }, []);

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <Navbar bg="custom" variant='light'>
            <div className='container '>
                <NavbarBrand ><strong>Travel Bug</strong></NavbarBrand>
                <NavItem>
                    <Link className="nav-link text-dark" to={localStorage.getItem('token') ? '/addtransport' : '/'}>{localStorage.getItem('token') ? 'Add new Transport' : ''}</Link>
                </NavItem>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    {
                        !localStorage.getItem('token') ?
                            <form className="d-flex" role="button">
                                <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                                <Link className="btn btn-secondary mx-2" to="/login" role="button">Login</Link>
                            </form> : <form className="d-flex" role="button">
                                <Button className="btn btn-secondary mx-2" onClick={handleLogout} role="button">Logout</Button>
                            </form>

                    }
                </div>
            </div>
        </Navbar>
    )
}

export default Nav
