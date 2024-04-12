import React from "react";
import ListFilmes from "../../components/ListFilms/ListFilmes.jsx";

import './style.css'

function Home() {

    return (
        <div>
            <div className="home-img-big">
                <h1>Movies</h1>
            </div>
            <ListFilmes />
        </div>
    );
}

export default Home;
