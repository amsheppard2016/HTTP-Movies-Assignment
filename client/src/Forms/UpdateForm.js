import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateForm = ({ history, getMovieList }) => {
    const [movie, setMovie] = useState();

    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then((res) => {
                setMovie(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err.response));
    }, []);

    const changeHandler = (e) => {
        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value,
        });
    };

    const starHandler = (e) => {
        const starArr = e.target.value.split(",");

        setMovie({
            ...movie,
            stars: starArr,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then((res) => {
                console.log(
                    "addnewform;handlesubmit;axios;post;success;res",
                    res
                );
                getMovieList();
                history.push("/");
            })
            .catch((err) => console.log(err));
    };

    return movie ? (
        <div className="update-form">
            <div className="movie-card">
                <h2>{movie.title}</h2>
                <div className="movie-director">
                    Director: <em>{movie.director}</em>
                </div>
                <div className="movie-metascore">
                    Metascore: <strong>{movie.metascore}</strong>
                </div>
                <h3>Actors</h3>

                {movie.stars.map((star) => (
                    <div key={star} className="movie-star">
                        {star}
                    </div>
                ))}
            </div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                />
                <input
                    type="text"
                    name="stars"
                    onChange={starHandler}
                    placeholder="Stars"
                />
                <button>Update Movie</button>
            </form>
        </div>
    ) : (
        <h2>Loading</h2>
    );
};

export default UpdateForm;
