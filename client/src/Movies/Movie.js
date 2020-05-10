import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
    const [movie, setMovie] = useState(null);
    const params = useParams();

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err.response));
    };

    const saveMovie = () => {
        addToSavedList(movie);
    };
    const history = useHistory();

    const deleteMovie = (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:5000/api/movies/${movie.id}`)
            .then((res) => {
                console.log("updateform;handlesubmit;put;success;res", res);
                getMovieList();
                history.push("/");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    return (
        <div className="movie-wrapper">
            <MovieCard movie={movie} />

            <div className="movie-buttons">
                <button onClick={saveMovie}>Save Movie</button>
                <button
                    onClick={() => history.push(`/update-movie/${movie.id}`)}
                >
                    Update Movie
                </button>
                <button onClick={deleteMovie}>Delete Movie</button>
            </div>
        </div>
    );
}

export default Movie;
