import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useParams, useHistory } from "react-router-dom";
import BackButton from "../../common/backButton";

const Edit = () => {
    const params = useParams();
    const { userId } = params;
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: [],
        completedMeetings: "",
        rate: ""
    });
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState([]);

    const transformData = (data) => {
        // изменение ключей из апи
        return data.map((item) => ({
            label: item.name,
            value: item._id
        }));
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, qualities, ...data }) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession ? profession._id : ""
            }));
            setIsLoading(false);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        name: {
            isRequired: { message: "Поле обязательно для заполнения" }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        qualities: {
            minArrayLength: {
                message: "Обязательно выберите качества",
                value: 1
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

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    // if (loading) {
    //     return (
    //         <div className="d-flex justify-content-center align-items-center vh-100 ">
    //             <div className="loading-container border border-2  w-50 p-3 shadow p-3 mb-5 bg-body-tertiary rounded">
    //                 <span className="d-flex justify-content-center ">
    //                     Loading...
    //                 </span>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="container mt-5">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100 ">
                    <div className="loading-container border border-2  w-50 p-3 shadow p-3 mb-5 bg-body-tertiary rounded">
                        <span className="d-flex justify-content-center">
                            Loading...
                        </span>
                    </div>
                </div>
            ) : (
                <>
                    <BackButton />

                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />

                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                <SelectField
                                    label="Выберите вашу профессию"
                                    defaultOption="Choose..."
                                    name="profession"
                                    onChange={handleChange}
                                    options={professions}
                                    value={data.profession}
                                    error={errors.profession}
                                />

                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    error={errors.qualities}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />

                                <TextField
                                    label="Встречался, раз:"
                                    name="completedMeetings"
                                    value={data.completedMeetings.toString()}
                                    onChange={handleChange}
                                    error={errors.completedMeetings}
                                />

                                <TextField
                                    label="Оценка:"
                                    name="rate"
                                    value={data.rate.toString()}
                                    onChange={handleChange}
                                    error={errors.rate}
                                />

                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    {isValid ? (
                                        "Обновить"
                                    ) : (
                                        <i className="bi bi-ban" />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Edit;
