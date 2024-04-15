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
