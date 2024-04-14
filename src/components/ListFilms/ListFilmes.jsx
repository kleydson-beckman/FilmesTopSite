import React from 'react';

import './style.css';


const filmsIMG = import.meta.env.VITE_IMG;

import img1 from "../../assets/noimage.png"

const ListFilmes = (film) => {

    return (
        <>
            <div className='film'>
                <ul>
                    <li>
                        <img className='img-film' src={film.info.poster_path ? `${filmsIMG}${film.info.poster_path}` : img1} alt={film.info.title} />
                        <h2 className='title'>{film.info.title}</h2>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ListFilmes;
