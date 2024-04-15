import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Button } from "@mui/material";

import ReplyIcon from '@mui/icons-material/Reply';

import CardTrailer from "../../components/CardTrailer/CardTrailer.jsx";

import img1 from "../../assets/noimage.png"
import img2 from "../../assets/load.gif"

import './style.css'

function Infos() {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=64de36c360b3b3769a76bff3285f3e93&language=pt-BR`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar detalhes do filme');
                }
                const data = await response.json();
                setFilme(data);
            } catch (error) {
                console.error('Erro:', error);
            } finally {
                setIsLoading(true);
            }
        };

        fetchFilme();
    }, [id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    if (isLoading) {
        return <div className="load"><img src={img2} alt="Carregando..." />Carregando...</div>;
    }

    return (
        <div className="infos-bloco" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${filme.backdrop_path})` }}>
            <div className="infos-btn-back">
                <Link to="/">
                    <Button><ReplyIcon /></Button>
                </Link>
            </div>
            <div className="infos-infor">
                <h1>Informações do Filme</h1>
                <div class="row">
                    <div class="col-md-8" id="infos-div-1">
                        <img className="infos-div-img" src={filme.poster_path ? `https://image.tmdb.org/t/p/w500/${filme.poster_path}` : img1} alt={filme.title} />
                    </div>
                    <div class="col-md-4" id="infos-div-2">
                        <h2>{filme.title}</h2>
                        <br />
                        <div className="infos-text-box">
                            <p><b>Sinopse: </b>
                                {filme.overview ? filme.overview : "Infelizmente não há uma sinopse disponível para este filme."}
                            </p>
                        </div>
                        <br />
                        <p><b>Data de Lançamento:</b> {filme.release_date}</p>
                    </div>
                </div>
            </div>
            <CardTrailer />
        </div>
    );
}

export default Infos;
