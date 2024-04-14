import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './style.css';

const apiKey = import.meta.env.VITE_API_KEY;

function CardTrailer() {
    const { id } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=64de36c360b3b3769a76bff3285f3e93`);
                
                if (!response.ok) {
                    throw new Error('Erro ao buscar vídeos do filme');
                }
                const data = await response.json();
    
                if (data.results && data.results.length > 0) {
                    const filteredVideos = data.results.filter(video => video.name.toLowerCase().includes('trailer'));
                    if (filteredVideos.length > 0) {
                        setVideos([filteredVideos[0]]);
                    } else {
                        setVideos(data.results);
                    }
                } else {
                    setVideos([]);
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchVideos();
    }, [id]);
    
    if (!videos || videos.length === 0) {
        return <div>Nenhum trailer disponível para o filme.</div>;
    }

    return (
        <div className="card-trailer-box">
            <h1>Trailer do Filme</h1>
            <div className="card-trailer">
                {videos.map(video => (
                    <div key={video.id}>
                        <iframe
                            width="880"
                            height="470"
                            src={`https://www.youtube.com/embed/${video.key}?vq=1080p`}
                            title={video.name}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardTrailer;
