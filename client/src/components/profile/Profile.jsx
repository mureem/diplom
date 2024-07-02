import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import './profile.css'; // Подключаем файл стилей для профиля
import avatarLogo from "../../assets/img/avatar-logo.svg"
import {API_URL} from "../../config.js";

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function changeHandler(e) {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }

    return (
        <div className="profile">
            <h2 className="profile-heading">Профиль</h2>
            <div className="avatar-section">
                <div className="avatar-container">
                    <img className="profile__avatar" src={avatar} alt=""/>
                </div>
                <div className="avatar-actions">
                    <label htmlFor="upload-avatar" className="upload-btn">
                        Загрузить новый аватар
                        <input id="upload-avatar" accept="image/*" onChange={e => changeHandler(e)} type="file" style={{ display: 'none' }} />
                    </label>
                    <button className="delete-btn" onClick={() => dispatch(deleteAvatar())}>
                        Удалить текущий аватар
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
