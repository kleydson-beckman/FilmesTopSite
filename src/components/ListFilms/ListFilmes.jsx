import React from 'react';

import img1 from "../../assets/noimage.png"

import './style.css';

// const filmsIMG = import.meta.env.VITE_IMG;

const ListFilmes = ({ info }) => {
    return (
        <>
            <div className='film'>
                <ul>
                    <li>
                        <img className='film-img' src={info.poster_path ? `https://image.tmdb.org/t/p/w500/${info.poster_path}` : img1} alt={info.title} />
                        <h2 className='film-title'>{info.title}</h2>
                    </li>
                </ul>
            </div>
        </>
    );
}


export default ListFilmes;
