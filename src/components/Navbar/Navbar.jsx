import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';

import './style.css'

const Navbar = () => {
    
    return (
        <div>
            <nav id="navbar">
                <div className='nav-bar-logo'>
                    <h2>
                        <Link to="/">Movies Lib</Link>
                    </h2>
                </div>
                <div className='nav-bar-extra'>
                    <ul className='nav-bar-list'>
                        <a>GÊNERO</a>
                        <a>GÊNERO</a>
                        <a>GÊNERO</a>
                        <a>GÊNERO</a>
                        <a>GÊNERO</a>
                        <a>GÊNERO</a>
                    </ul>
                    <form>
                        <TextField className='imput' id="demo-helper-text-misaligned-no-helper" label="Buscar Filme" focused />
                        <button type='submit'>S</button>
                    </form>
                </div>

                {/* <Link to="/home">Terror</Link>
                <Link to="/infos">Suspense</Link> */}
            </nav>
        </div>
    )
}

export default Navbar
