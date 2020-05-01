import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import AddNewForm from "./Forms/AddNewForm";
import UpdateForm from "./Forms/UpdateForm";
import Movie from "./Movies/Movie";
import axios from "axios";

const App = () => {
    const [savedList, setSavedList] = useState([]);
    const [movieList, setMovieList] = useState([]);

    const getMovieList = () => {
        axios
            .get("http://localhost:5000/api/movies")
            .then((res) => setMovieList(res.data))
            .catch((err) => console.log(err.response));
    };

    const history = useHistory();

    const addToSavedList = (movie) => {
        setSavedList([...savedList, movie]);
    };

    useEffect(() => {
        getMovieList();
    }, []);

    return (
        <div className="wrapper">
            <Route exact path="/">
                <SavedList list={savedList} />
                <MovieList movies={movieList} />
            </Route>

            <Route path="/movies/:id">
                <SavedList list={savedList} />
                <Movie
                    addToSavedList={addToSavedList}
                    getMovieList={getMovieList}
                />
            </Route>

            <Route path="/add-movie">
                <SavedList list={savedList} />
                <AddNewForm history={history} getMovieList={getMovieList} />
            </Route>

            <Route path="/update-movie/:id">
                <UpdateForm history={history} getMovieList={getMovieList} />
            </Route>
        </div>
    );
};

export default App;
