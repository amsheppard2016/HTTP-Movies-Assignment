import React from "react";
import { NavLink, Link } from "react-router-dom";

function SavedList({ list }) {
    return (
        <div className="wrapper">
            <div className="nav-bar">
                <Link to="/"> Movie List</Link>

                <Link to="/add-movie">Add Movie</Link>
            </div>

            <div className="saved-list">
                <h3>Saved Movies:</h3>
                {list.map((movie) => {
                    return (
                        <NavLink
                            to={`/movies/${movie.id}`}
                            key={movie.id}
                            activeClassName="saved-active"
                        >
                            <span className="saved-movie">{movie.title}</span>
                        </NavLink>
                    );
                })}
                <div className="home-button">
                    <Link to="/">Movie List</Link>
                </div>
            </div>
        </div>
    );
}

export default SavedList;
