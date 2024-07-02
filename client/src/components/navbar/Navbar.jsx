import React, {useRef, useState} from 'react';
import './navbar.css';
import Logo from '../../assets/img/navbar-logo.svg';
import { NavLink } from "react-router-dom";
import { logout } from "../../reducers/userReducer.js";
import { useDispatch, useSelector } from "react-redux";
import {getFiles, searchFiles} from "../../actions/file.js";
import {showLoader} from "../../reducers/appReducer.js";
import avatarLogo from "../../assets/img/avatar-logo.svg"
import {API_URL} from "../../config";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const headerRef = useRef(null);
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo




    const handleHeaderClick = (e) => {
        e.preventDefault();
        const headerSpans = headerRef.current.querySelectorAll('span');
        headerSpans.forEach((span, index) => {
            span.style.animation = `colorChange 0.5s forwards ${index * 0.1}s`;
        });

        setTimeout(() => {
            headerSpans.forEach(span => {
                span.style.animation = '';
            });
        }, headerSpans.length * 100 + 500);
    };

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                <NavLink to="/" className="navbar__logo-container" onClick={handleHeaderClick}>
                    <img src={Logo} alt="" className="navbar__logo" />
                    <div className="navbar__header" ref={headerRef}>
                        {'ВМСС'.split('').map((char, index) => (
                            <span key={index}>{char}</span>
                        ))}
                    </div>
                </NavLink>
                <div className="navbar__buttons">
                    {isAuth && <input
                        value={searchName}
                        onChange={e => searchChangeHandler(e)}
                        type="text"
                        className="navbar__search"
                        placeholder="Название файла..."/>}
                    {!isAuth && <NavLink to="/login" className="navbar__button">Войти</NavLink>}
                    {!isAuth && <NavLink to="/registration" className="navbar__button">Регистрация</NavLink>}
                    <div className="navbar__exit">
                        {isAuth && <div className="navbar__button" onClick={() => dispatch(logout())}>Выход</div>}
                    </div>
                    {isAuth && <NavLink to='/profile'>
                        <img className="navbar__avatar" src={avatar} alt=""/>
                    </NavLink>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
