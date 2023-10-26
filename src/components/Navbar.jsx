import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { reset } from "../features/auth/authSlice"
import flag from "../assets/flag.png"
import "./Navbar.css"
import { verifyUser } from '../utils/functions/verifyUser';

const Navbar = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const [userDetail, setUserDetail] = useState({})

    useEffect(() => {
        const user = verifyUser(token)
        setUserDetail(user)
    }, [])
    // console.log("userDetail na ", userDetail);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navcolor mb-3">
            <div className="container-fluid" >
                <div className="navbar-brand logoFlag">
                    <img src={flag} alt="Flag Image" />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link to="/surveys" style={{ textDecoration: "none" }} >
                                <div className='nav-link' style={{ color: "#ffffff" }}> Dashboard </div>
                            </Link>
                        </li>

                        {userDetail.userRole !== '3' &&
                            <li className="nav-item">
                                <Link to="/allusers" style={{ textDecoration: "none" }} >
                                    <div className='nav-link' style={{ color: "#ffffff" }}> All Users </div>
                                </Link>
                            </li>
                        }
                        {
                            userDetail.userRole !== 'admin' &&
                            <li className="nav-item">
                                <Link to="/form" style={{ textDecoration: "none" }} >
                                    <div className='nav-link' style={{ color: "#ffffff" }}> Survey Form </div>
                                </Link>
                            </li>
                        }
                    </ul>
                    <form className="d-flex">
                        <Link style={{ color: "#ffffff", textDecoration: "none" }} to="/" onClick={async () => (localStorage.removeItem("surveyApp"), dispatch(reset()))} >

                            <div className="nav-link" type="submit">Logout</div>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    )

}

export default Navbar
