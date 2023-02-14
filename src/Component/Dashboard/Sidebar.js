
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export const Sidebar = ({ pageid }) => {
    const { user, removeUserData, dispatch } = useContext(AppContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const Logout = () => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(removeUserData(user.id));
            navigate("/login")
        }, 2000);
    }

    return (
        <>

            <div className="sidebar active db-bar">
                <div className="logo_content mb-4">
                    <div className="logo">
                        <div className="heading fs-4" style={{ "marginLeft": "5px" }}>{user.data.name}</div>
                    </div>
                </div>
                <ul className="nav_list ps-0 mt-0">
                    <li>
                        <Link className={`${pageid === "account" && "active"}`} to={'/my-account'}>
                            <i class='fa fa-user-circle'></i>
                            <span className="link_names">My Account</span>
                        </Link>
                        <span className="tooltip">My Account</span>
                    </li>
                    {user.data.user_type === "user" &&
                        <>
                            <li>
                                <Link to={'/wishlist'} className={`${pageid === "wishlist" && "active"}`}>
                                    <i class='fa fa-file-invoice' ></i>
                                    <span className="link_names">Wishlist</span>
                                </Link>
                                <span className="tooltip">Wishlist</span>
                            </li>
                            <li>
                                <Link to={'/like'} className={`${pageid === "like" && "active"}`}>
                                    <i class='fa fa-thumbs-up' ></i>
                                    <span className="link_names">Like</span>
                                </Link>
                                <span className="tooltip">Like</span>
                            </li>
                            <li>
                                <Link to={'/saved'} className={`${pageid === "saved" && "active"}`}>
                                    <i class='fa fa-save'></i>
                                    <span className="link_names">My Cart</span>
                                </Link>
                                <span className="tooltip">My Cart</span>
                            </li>
                            <li>
                                <Link to={'/goals'} className={`${pageid === "goals" && "active"}`}>
                                    <i class='fa fa-save'></i>
                                    <span className="link_names">Goals</span>
                                </Link>
                                <span className="tooltip">Goals</span>
                            </li>
                            {/* <li>
                                <Link to={'/completed-projects'} className={`${pageid === "cproject" && "active"}`}>
                                    <i class='fa fa-project-diagram'></i>
                                    <span className="link_names">Completed Projects</span>
                                </Link>
                                <span className="tooltip">Completed Projects</span>
                            </li> */}
                        </>
                    }
                    <li>
                        <a href='#' onClick={Logout}>
                            {isLoading ?
                                <i className='d-flex justify-content-center align-items-center'>
                                    <div className="spinner d-flex justify-content-center align-items-center">
                                        <div className="spinner-border" style={{ "float": "right" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </i>
                                :
                                <i class='fa fa-power-off' ></i>
                            }
                            <span className="link_names">Logout</span>
                        </a>
                        <span className="tooltip">Logout</span>
                    </li>
                </ul>
            </div>

        </>
    )
}
