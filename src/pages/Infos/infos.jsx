import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Button } from "@mui/material";

import ReplyIcon from '@mui/icons-material/Reply';

import CardTrailer from "../../components/CardTrailer/CardTrailer.jsx";

import img1 from "../../assets/noimage.png"

import './style.css'

const apiKey = import.meta.env.VITE_API_KEY;
const filmsDetails = import.meta.env.VITE_DET;
const filmsIMG = import.meta.env.VITE_IMG;
const filmsSLIDE = import.meta.env.VITE_SLIDE;

// função para coletar os detalhes dos filmes
function Infos() {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const response = await fetch(`${filmsDetails}/${id}?api_key=64de36c360b3b3769a76bff3285f3e93&language=pt-BR`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar detalhes do filme');
                }
                const data = await response.json();
                setFilme(data);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchFilme();
    }, [id]);

    if (!filme) {
        return 
        <div>Carregando...</div>;
    }

    return (
        <div className="infos-bloco" style={{ backgroundImage: `url(${filmsSLIDE}${filme.backdrop_path})` }}>
            <div className="infos-btn-back">
                <Link to="/">
                    <Button><ReplyIcon /></Button>
                </Link>
            </div>
            <div className="infos-infor">
                <h1>Informações do Filme</h1>
                <div class="row">
                    <div class="col-md-8" id="infos-div-1">
                        <img className="infos-div-img" src={filme.poster_path ? `${filmsIMG}${filme.poster_path}` : img1} alt={filme.title} />
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
