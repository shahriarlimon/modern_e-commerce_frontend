import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Search.css";

const Search = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate("/products")
        }

    }
    return (
        <Fragment>
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input type={"text"} placeholder="Search a product" onChange={(e) => setKeyword(e.target.value)} />
                <input value={"Search"} type={"submit"} />

            </form>
        </Fragment>
    );
};

export default Search;