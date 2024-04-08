import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState(null); // Устанавливаю начальное значение как null, чтобы лучше управлять состоянием загрузки
    const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
    const history = useHistory();

    useEffect(() => {
        api.users
            .getById(userId)
            .then((data) => {
                setUser(data);
            })
            .catch(() => {
                history.push(`/userNotFound/${userId}`);
            })
            .finally(() => {
                setLoading(false); // После завершения запроса, устанавливаем loading в false
            });
    }, []);

    const returnButton = () => {
        history.push("/users");
    };

    if (loading) {
        return "Loading..."; // Отображаем сообщение о загрузке, пока выполняется запрос
    }

    // Проверяем, найден ли пользователь
    if (!user) {
        return (
            <div className="alert alert-danger" role="alert">
                {`${userId} Not found`}
            </div>
        ); // Возвращаем сообщение об ошибке, если пользователь не найден
    }

    return (
        <div className="container mt-5">
            <h2>{user.name}</h2>
            <p>Профессия: {user.profession.name}</p>
            <p>Качества:</p>
            <ul>
                {user.qualities.map((quality) => (
                    <li key={quality._id}>{quality.name}</li>
                ))}
            </ul>
            <p>Встречался, раз: {user.completedMeetings}</p>
            <p>Оценка: {user.rate}</p>
            <button
                type="button"
                className="btn btn-outline-warning"
                onClick={returnButton}
            >
                Вернуться
            </button>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
