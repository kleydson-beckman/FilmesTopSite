import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListFilmes from "../../components/ListFilms/ListFilmes";

import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button, List, ListItem, ListItemText, Drawer, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import img1 from "../../assets/logo.png"
import img2 from "../../assets/noimage.png"

import './style.css';

// const apiKey = import.meta.env.VITE_API_KEY;
// const filmsURL = import.meta.env.VITE_API_FILMS;
// const filmsSearch = import.meta.env.VITE_SEARCH;
// const filmsSLIDE = import.meta.env.VITE_SLIDE;

let url = "https://api.themoviedb.org/3/movie/now_playing?api_key=64de36c360b3b3769a76bff3285f3e93&language=pt-BR";

const Screen = () => {

    const [filmData, setfilmData] = useState([]);
    const [filmURL, setfilmURL] = useState(url);
    const [filmSearch, setfilmSearch] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [highlightedFilm, setHighlightedFilm] = useState(filmData[0]);
    const [arrayCateg, setArrayCateg] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("FILMES + POPULARES");

    // Função useEffect para buscar e armazenar as categorias de filmes
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=64de36c360b3b3769a76bff3285f3e93&language=pt-BR`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar categorias de filmes');
                }
                const data = await response.json();
                setCategorias(data.genres);
                const categoryNames = data.genres.map(genre => genre.name);
                setArrayCateg(categoryNames);
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        fetchCategorias();
    }, []);

    // Função useEffect para buscar e armazenar os dados dos filmes 
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
                setHighlightedFilm(data.results[0]);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }, [filmURL]);

    // Função para buscar os filmes de um gênero
    const getData = (filmGenre) => {
        const genre = categorias.find(cat => cat.name === filmGenre);
        if (genre) {
            const genreId = genre.id;
            const genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=64de36c360b3b3769a76bff3285f3e93&with_genres=${genreId}&language=pt-BR`;
            setfilmURL(genreURL);
            setSelectedCategory("GÊNERO: " + filmGenre);
        }
    };

    // Função para atualizar slider
    const handleMouseOver = (film) => {
        setHighlightedFilm(film);
    };

    // Função para buscar filmes com base no termo de pesquisa e atualizar os dados de filmes exibidos
    const searchFilm = async (event) => {
        event.preventDefault();
        if (!filmSearch.trim()) {
            setShowAlert(true);
            return;
        }
        try {
            let allResults = [];
            let page = 1;
            let totalPages = 1; // Começa com 1 para garantir que o loop seja executado pelo menos uma vez

            // Loop até todas as páginas serem buscadas
            while (page <= totalPages) {
                const newFilmURL = `https://api.themoviedb.org/3/search/movie?api_key=64de36c360b3b3769a76bff3285f3e93&query=${filmSearch}&language=pt-BR&page=${page}`;
                const response = await fetch(newFilmURL);
                if (!response.ok) {
                    throw new Error('Erro ao buscar filmes');
                }
                const data = await response.json();

                // Filtra os resultados para incluir apenas os filmes cujo título contenha a palavra-chave
                const filteredResults = data.results.filter(film => film.title.toLowerCase().includes(filmSearch.toLowerCase()));

                allResults = [...allResults, ...filteredResults];
                totalPages = data.total_pages;
                page++;
            }

            setfilmData(allResults);
            setSelectedCategory("FILMES COM: \"" + filmSearch + "\"");
            setfilmSearch("");
        } catch (error) {
            console.error('Erro:', error);
        }
    }


    // Função para controlar a abertura e fechamento do menu de categorias
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <div className="header">
                <div className='header-logo'>
                    <img src={img1} alt="" />
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled button group">
                        <Button>REGISTRAR</Button>
                        <Button>ENTRAR</Button>
                    </ButtonGroup>
                </div>
                {/* MENU E SEARCH */}
                <div className="header-click">
                    <IconButton className="header-categ" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <h3 className="header-categ-gen">GÊNEROS</h3>
                        <List sx={{ marginTop: '60px' }}>
                            {arrayCateg.map((value, index) => (
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
                                autoComplete="off"
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
                            VOCÊ PRECISA PREENCHER O CAMPO PARA PESQUISAR
                        </Alert>
                    </div>
                )}
            </div>
            {/* IMG BIG */}
            <div className="header-slider">
                {highlightedFilm && (
                    <div className="header-slider-poster">
                        <h1 className="header-slider-title">{highlightedFilm.title}</h1>
                        <img src={highlightedFilm.backdrop_path ? `https://image.tmdb.org/t/p/original/${highlightedFilm.backdrop_path}` : img2} alt="" />
                    </div>
                )}
            </div>
            {/* FILMES */}
            <div className="content">
                <div className="content-categ">
                    <h1>{selectedCategory}</h1>
                </div>
                <div className="content-films">
                    {filmData.map((film, index) => (
                        <div key={index} onMouseOver={() => handleMouseOver(film)}>
                            <Link to={`/infos/${film.id}`}>
                                <ListFilmes info={film} key={index} />
                            </Link>
                        </div>
                    ))}
                </div>
                {/* FOOTER */}
                <div className="footer">
                    <div className="footer-logo">
                        <img src={img1} alt="Logo Site" />
                    </div>
                    <div className="footer-btn">
                        <ul>
                            <li>Termos e Condições de Uso</li>
                            <li>Política de privacidade</li>
                            <li>Proteção de Dados no Brasil</li>
                            <li>Anúncios personalizados</li>
                            <li>Dispositivos compatíveis</li>
                        </ul>
                    </div>
                    <div className="footer-copy">
                        <p>&#169; Crypticalcoder, Kleydson Beckman. All right reserved 2024.</p>
                        <br />
                        <p>FilmesTop.com é um serviço pago, baseado em assinatura e sujeito a termos e condições. O serviço FilmesTop.com é comercializado por FilmesTop Company (Brasil) Ltda.</p>
                    </div>
                    <div className="footer-links">
                        <div class="row">
                            <div class="col-md-6">
                                <a href="https://www.instagram.com/ubeckeer/" target="_blank" class="footer-social">
                                    <InstagramIcon />
                                </a>
                                <a href="https://bit.ly/3W9B9Kh" target="_blank" >
                                    <LinkedInIcon />
                                </a>
                                <a href="https://kleydsonbeckmansite.netlify.app" target="_blank">
                                    <LanguageIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Screen;
