import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const apiKey = import.meta.env.VITE_API_KEY;
const filmsURL = import.meta.env.VITE_API;
const filmsIMG = import.meta.env.VITE_IMG;

const ListFilmes = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar categorias de filmes');
                }
                const data = await response.json();
                setCategorias(data.genres);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchCategorias();
    }, []);

    const getFilmesPorCategoria = async (categoriaId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoriaId}&language=pt-BR`);
            if (!response.ok) {
                throw new Error('Erro ao buscar filmes por categoria');
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Erro:', error);
            return [];
        }
    };

    const [filmesPorCategoria, setFilmesPorCategoria] = useState({});

    useEffect(() => {
        const fetchFilmesPorCategoria = async () => {
            const filmesPorCategoriaTemp = {};
            await Promise.all(
                categorias.map(async (categoria) => {
                    const filmes = await getFilmesPorCategoria(categoria.id);
                    filmesPorCategoriaTemp[categoria.id] = filmes;
                })
            );
            setFilmesPorCategoria(filmesPorCategoriaTemp);
        };
        fetchFilmesPorCategoria();
    }, [categorias]);

    return (
        <div>
            {categorias.map((categoria) => (
                <div key={categoria.id}>
                    <h2>{categoria.name}</h2>
                    <ul className="filme-list">
                        {filmesPorCategoria[categoria.id]?.map((filme) => (
                            <li key={filme.id}>
                                <Link to={`/infos/${filme.id}`}>
                                    <img src={filmsIMG + filme.poster_path} alt={filme.title} />
                                </Link>
                                <h3>{filme.title}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default ListFilmes;
