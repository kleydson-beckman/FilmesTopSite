import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListFilmes from "../../components/ListFilms/ListFilmes";
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button, List, ListItem, ListItemText, Drawer, IconButton } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MenuIcon from '@mui/icons-material/Menu';
import Alert from '@mui/material/Alert';
import './style.css';

import img1 from "../../assets/logo.png"
import img2 from "../../assets/noimage.png"

const apiKey = import.meta.env.VITE_API_KEY;
const filmsURL = import.meta.env.VITE_API_FILMS;
const filmsSearch = import.meta.env.VITE_SEARCH;
const filmsSLIDE = import.meta.env.VITE_SLIDE;

let url = filmsURL + "?" + apiKey + "&language=pt-BR";

const Screen = () => {
    const [filmData, setfilmData] = useState([]);
    const [filmURL, setfilmURL] = useState(url);
    const [filmSearch, setfilmSearch] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [highlightedFilm, setHighlightedFilm] = useState(null);
    const [arr, setArr] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}&language=pt-BR`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar categorias de filmes');
                }
                const data = await response.json();
                setCategorias(data.genres);
                const categoryNames = data.genres.map(genre => genre.name);
                setArr(categoryNames);
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        fetchCategorias();
    }, []);

    useEffect(() => {
        fetch(filmURL)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Erro ao buscar filmes');
                }
                return res.json();
            })
            .then(data => {
                setfilmData(data.results);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }, [filmURL]);

    const getData = (filmGenre) => {
        const genre = categorias.find(cat => cat.name === filmGenre);
        if (genre) {
            const genreId = genre.id;
            const genreURL = `https://api.themoviedb.org/3/discover/movie?${apiKey}&with_genres=${genreId}&language=pt-BR`;
            setfilmURL(genreURL);
        }
    };

    const handleMouseOver = (film) => {
        setHighlightedFilm(film);
    };


    const searchFilm = async (event) => {
        event.preventDefault();
        if (!filmSearch.trim()) {
            setShowAlert(true);
            return;
        }
        try {
            const newFilmURL = `${filmsSearch}?${apiKey}&query=${filmSearch}&language=pt-BR`;
            const response = await fetch(newFilmURL);
            if (!response.ok) {
                throw new Error('Erro ao buscar filmes');
            }
            const data = await response.json();
            setfilmData(data.results);
            setfilmSearch("");
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <div className="header">
                <div className='nav-bar-logo'>
                    <img src={img1} alt="" />
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled button group">
                        <Button>REGISTRAR</Button>
                        <Button>LOGIN</Button>
                    </ButtonGroup>
                </div>
                <div className="header-click">
                    <IconButton className="header-categ" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <h3 className="header-categ-gen">GENEROS</h3>
                        <List sx={{ marginTop: '60px' }}>
                            {arr.map((value, index) => (
                                <ListItem button key={index} onClick={() => getData(value)}>
                                    <ListItemText sx={{ textAlign: 'center' }} primary={value} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <form onSubmit={searchFilm}>
                        <div className="conj-search">
                            <TextField
                                type="text"
                                className='imputText'
                                id="demo-helper-text-misaligned-no-helper"
                                label="Buscar Filme"
                                onChange={(e) => {
                                    setfilmSearch(e.target.value)
                                }}
                                value={filmSearch}
                                focused
                            />
                            <Button className="btn-search" type='submit'><TravelExploreIcon /></Button>
                        </div>
                    </form>
                </div>
                {showAlert && (
                    <div className="screen-alert">
                        <span className="screen-alert-back"></span>
                        <Alert severity="warning" onClose={() => { setShowAlert(false) }}>
                            This Alert displays the default close icon.
                        </Alert>
                    </div>
                )}
            </div>
            <div className="header-slider">
                {highlightedFilm && (
                    <img src={highlightedFilm.backdrop_path ? `${filmsSLIDE}${highlightedFilm.backdrop_path}` : img2} alt="" />
                )}
            </div>
            <div className="content">
                {filmData.map((film, index) => (
                    <div key={index} onMouseOver={() => handleMouseOver(film)}>
                        <Link to={`/infos/${film.id}`}>
                            <ListFilmes info={film} key={index} />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Screen;
