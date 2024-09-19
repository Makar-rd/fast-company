import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />

                {error && <div className="invalid-feedback ">{error}</div>}
            </div>
        </div>
    );
};
TextAreaField.defaultProps = {
    type: "text"
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
// import React, { useState, useEffect } from "react";

// const TextAreaField = ({ value, onChange, error }) => {
//     // Создаем состояние для хранения значения текста в textarea
//     const [text, setText] = useState(value);

//     useEffect(() => {
//         setText(value);
//     }, [value]);

//     // Обработчик изменения текста в textarea
//     const handleTextChange = (event) => {
//         const newText = event.target.value;
//         setText(newText);
//         onChange(newText);
//     };

//     const inputClasses = error ? "form-control is-invalid" : "form-control";

//     return (
//         <div className="mb-4">
//             {/* Создаем textarea с привязанным состоянием value и обработчиком изменений */}
//             <textarea
//                 className={inputClasses}
//                 value={text} // Привязываем значение textarea к состоянию text
//                 onChange={handleTextChange} // Обрабатываем изменения в textarea
//                 rows={3} // Устанавливаем количество строк
//             ></textarea>
//             {/* Отображаем сообщение об ошибке, если оно есть */}
//             {error && <div className="text-danger">{error}</div>}
//         </div>
//     );
// };

// export default TextAreaField;
