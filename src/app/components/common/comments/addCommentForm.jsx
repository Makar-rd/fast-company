import React, { useEffect, useState } from "react";
import API from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name="userId"
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
// import React, { useState, useEffect } from "react";
// import api from "../../../api";
// import SelectField from "../form/selectField";
// import TextAreaField from "../form/textAreaField";
// import { validator } from "../../../utils/validator";
// import PropTypes from "prop-types";

// const AddCommentForm = ({ onAddComment }) => {
//     const [data, setData] = useState({
//         users: "",
//         text: ""
//     });

//     const [users, setUsers] = useState([]);
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         api.users.fetchAll().then((data) => {
//             const usersList = Object.keys(data).map((usersName) => ({
//                 label: data[usersName].name,
//                 value: data[usersName]._id
//             }));
//             setUsers(usersList);
//         });
//     }, []);

//     const handleChange = (target) => {
//         setData((prevState) => ({
//             ...prevState,
//             [target.name]: target.value
//         }));
//     };

//     const validatorConfig = {
//         users: {
//             isRequired: {
//                 message: "Обязательно выберите пользователя"
//             }
//         },
//         text: {
//             isRequired: {
//                 message: "Обязательно введите сообщение"
//             }
//         }
//     };

//     useEffect(() => {
//         validate();
//     }, [data]);

//     const validate = () => {
//         const errors = validator(data, validatorConfig);
//         setErrors(errors);
//         return Object.keys(errors).length === 0;
//     };
//     const isValid = Object.keys(errors).length === 0;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newComment = {
//             userId: data.users,
//             content: data.text,
//             pageId: ""
//         };
//         api.comments.add(newComment).then((comment) => {
//             onAddComment(comment);
//             setData({ users: "", text: "" });
//         });
//     };

//     return (
//         <div className="card-body">
//             <div>
//                 <h2>New comment</h2>

//                 <SelectField
//                     defaultOption="Выберите пользователя"
//                     options={users}
//                     name="users"
//                     onChange={handleChange}
//                     value={data.users}
//                     error={errors.users}
//                 />
//                 <div className="mb-4">
//                     <label
//                         htmlFor="exampleFormControlTextarea1"
//                         className="form-label"
//                     >
//                         Сообщение
//                     </label>

//                     <TextAreaField
//                         value={data.text}
//                         onChange={(newText) =>
//                             setData((prevData) => ({
//                                 ...prevData,
//                                 text: newText
//                             }))
//                         }
//                         error={errors.text}
//                     />

//                     <button
//                         className="btn btn-primary mt-3 float-end"
//                         type="submit"
//                         disabled={!isValid}
//                         onClick={handleSubmit}
//                     >
//                         Опубликовать
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// AddCommentForm.propTypes = {
//     onAddComment: PropTypes.func
// };

// export default AddCommentForm;
