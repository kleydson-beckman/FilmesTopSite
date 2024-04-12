import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardTrailer from "../../components/CardTrailer/CardTrailer.jsx";

const apiKey = import.meta.env.VITE_API_KEY;
const filmsDetails = import.meta.env.VITE_DET;
const filmsIMG = import.meta.env.VITE_IMG;

function Infos() {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const response = await fetch(`${filmsDetails}/${id}?api_key=${apiKey}&language=pt-BR`);
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
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Informações do Filme</h1>
            <img src={`${filmsIMG}${filme.poster_path}`} alt={filme.title} />
            <h2>{filme.title}</h2>
            <p>Sinopse: {filme.overview}</p>
            <p>Data de Lançamento: {filme.release_date}</p>
            <CardTrailer/>
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    );
}

export default Infos;
