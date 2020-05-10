import React, { useState } from "react";

import axios from "axios";

const initialState = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
};

const AddNewForm = ({ getMovieList, history }) => {
    const [newMovie, setNewMovie] = useState(initialState);

    const changeHandler = (e) => {
        let value = e.target.value;

        setNewMovie({
            ...newMovie,
            id: Math.random(),
            [e.target.name]: value,
        });
    };

    const starhandler = (e) => {
        const starArr = e.target.value.split(",");

        setNewMovie({
            ...newMovie,
            stars: starArr,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/movies", newMovie)
            .then((res) => {
                console.log(
                    "addnewform;handlesubmit;axios;post;success;res",
                    res
                );
                getMovieList();
                history.push("/");
            })
            .catch((err) => console.log(err));
        setNewMovie(initialState);
    };

    return (
        <div className="new-movie">
            <h2>Add New Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={newMovie.title}
                />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={newMovie.director}
                />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={newMovie.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    onChange={starhandler}
                    placeholder="Stars"
                    value={newMovie.stars}
                />
                <button>Add New Movie</button>
            </form>
        </div>
    );
};

export default AddNewForm;
