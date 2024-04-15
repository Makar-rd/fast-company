import React, { useState } from "react";

const Search = () => {
    const [name, setName] = useState("");

    const searchName = ({ target }) => {
        setName(target.value);
        console.log(target);
    };
    return (
        <form action="">
            <div>
                <input
                    className="form-control form-control-lg mb-2"
                    type="text"
                    placeholder="Search..."
                    name="searchName"
                    value={name}
                    onChange={searchName}
                ></input>
            </div>
        </form>
    );
};

export default Search;
// import React, { useState, useEffect } from "react";
// import Api from "../api/fake.api/user.api";

// const Search = () => {
//     const [name, setName] = useState(""); // Состояние для хранения значения поиска
//     const [loading, setLoading] = useState(false); // Состояние для отображения состояния загрузки
//     const [error, setError] = useState(false); // Состояние для отображения состояния ошибки загрузки
//     const [names, setNames] = useState([]); // Состояние для хранения списка имен

//     // Загрузка списка имен
//     useEffect(() => {
//         setLoading(true); // Устанавливаем состояние загрузки в true
//         Api.fetchAll()
//             .then((users) => {
//                 setNames(users.map((user) => user.name)); // Устанавливаем имена пользователей в состояние
//                 setLoading(false); // Устанавливаем состояние загрузки в false
//                 setError(false); // Устанавливаем состояние ошибки в false
//             })
//             .catch((error) => {
//                 console.error("Error fetching names:", error);
//                 setLoading(false); // Устанавливаем состояние загрузки в false
//                 setError(true); // Устанавливаем состояние ошибки в true
//             });
//     }, []); // Пустой массив зависимостей означает, что useEffect будет выполняться только при монтировании компонента

//     // Функция для обновления списка имен в случае ошибки
//     const reloadNames = () => {
//         setError(false);
//         setLoading(true); // Устанавливаем состояние загрузки в true
//         Api.fetchAll()
//             .then((users) => {
//                 setNames(users.map((user) => user.name)); // Устанавливаем имена пользователей в состояние
//                 setLoading(false); // Устанавливаем состояние загрузки в false
//                 setError(false); // Устанавливаем состояние ошибки в false
//             })
//             .catch((error) => {
//                 console.error("Error reloading names:", error);
//                 setLoading(false); // Устанавливаем состояние загрузки в false
//                 setError(true); // Устанавливаем состояние ошибки в true
//             });
//     };

//     // Обработчик изменения значения в поле поиска
//     const handleSearch = ({ target }) => {
//         setName(target.value);
//     };

//     // Фильтрация списка имен по введенному значению
//     const filteredNames = names.filter((name) =>
//         name.toLowerCase().includes(name.toLowerCase())
//     );

//     return (
//         <div>
//             {/* Отображение состояния загрузки */}
//             {loading && <p>Loading...</p>}
//             {/* Отображение состояния ошибки загрузки */}
//             {error && (
//                 <div>
//                     <p>Failed to load names</p>
//                     <button onClick={reloadNames}>Retry</button>
//                 </div>
//             )}
//             {/* Поле для ввода поискового запроса */}
//             {!loading && !error && (
//                 <input
//                     className="form-control form-control-lg mb-2"
//                     type="text"
//                     placeholder="Search..."
//                     name="searchName"
//                     value={name}
//                     onChange={handleSearch}
//                 />
//             )}
//             {/* Отображение списка имен */}
//             {!loading && !error && (
//                 <ul>
//                     {filteredNames.map((name, index) => (
//                         <li key={index}>{name}</li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default Search;
