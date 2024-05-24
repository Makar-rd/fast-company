import React, { useState, useEffect } from "react";

const TextAreaField = ({ value, onChange, error }) => {
    // Создаем состояние для хранения значения текста в textarea
    const [text, setText] = useState(value);

    useEffect(() => {
        setText(value);
    }, [value]);

    // Обработчик изменения текста в textarea
    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        onChange(newText);
    };

    const inputClasses = error ? "form-control is-invalid" : "form-control";

    return (
        <div className="mb-4">
            {/* Создаем textarea с привязанным состоянием value и обработчиком изменений */}
            <textarea
                className={inputClasses}
                value={text} // Привязываем значение textarea к состоянию text
                onChange={handleTextChange} // Обрабатываем изменения в textarea
                rows={4} // Устанавливаем количество строк
            ></textarea>
            {/* Отображаем сообщение об ошибке, если оно есть */}
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

export default TextAreaField;
