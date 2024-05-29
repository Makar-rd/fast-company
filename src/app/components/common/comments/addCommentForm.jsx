import React, { useState, useEffect } from "react";
import api from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const AddCommentForm = ({ onAddComment }) => {
    const [data, setData] = useState({
        users: "",
        text: ""
    });

    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const usersList = Object.keys(data).map((usersName) => ({
                label: data[usersName].name,
                value: data[usersName]._id
            }));
            setUsers(usersList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        users: {
            isRequired: {
                message: "Обязательно выберите пользователя"
            }
        },
        text: {
            isRequired: {
                message: "Обязательно введите сообщение"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            userId: data.users,
            content: data.text,
            pageId: ""
        };
        api.comments.add(newComment).then((comment) => {
            onAddComment(comment);
            setData({ users: "", text: "" });
        });
    };

    return (
        <div className="card-body">
            <div>
                <h2>New comment</h2>

                <SelectField
                    defaultOption="Выберите пользователя"
                    options={users}
                    name="users"
                    onChange={handleChange}
                    value={data.users}
                    error={errors.users}
                />
                <div className="mb-4">
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >
                        Сообщение
                    </label>

                    <TextAreaField
                        value={data.text}
                        onChange={(newText) =>
                            setData((prevData) => ({
                                ...prevData,
                                text: newText
                            }))
                        }
                        error={errors.text}
                    />

                    <button
                        className="btn btn-primary mt-3 float-end"
                        type="submit"
                        disabled={!isValid}
                        onClick={handleSubmit}
                    >
                        Опубликовать
                    </button>
                </div>
            </div>
        </div>
    );
};

AddCommentForm.propTypes = {
    onAddComment: PropTypes.func
};

export default AddCommentForm;
