import React, { useState, useEffect } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tokenLoader } from "../../utils/auth";

import classes from "./MainNavigation.module.scss";

const MainNavigation = () => {
    const token = useRouteLoaderData("root");
    const [user, setUser] = useState(token);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    const logoutHandler = () => {
        dispatch({ type: "ON_LOGOUT" });
    };

    useEffect(() => {
        setUser(tokenLoader);
    }, [isAuthenticated]);

    return (
        <header className={`${classes.header} container`}>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/shop"}
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Shop
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={classes.logo}> Boutique</div>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to={"/cart"}
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            <i className="bi bi-bag-check-fill me-1"></i>
                            Cart
                        </NavLink>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <i className="bi bi-person-circle me-1"></i>
                                <NavLink>{user.username}</NavLink>
                                <i
                                    className="bi bi-caret-down-fill"
                                    style={{ fontSize: "0.75rem" }}
                                ></i>
                            </li>
                            <li className="fst-italic">
                                <button type="submit" onClick={logoutHandler}>
                                    (Logout)
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <NavLink
                                to={"/login"}
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
