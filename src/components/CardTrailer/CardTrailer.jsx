import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;


function CardTrailer() {
    const { id } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
                
                if (!response.ok) {
                    throw new Error('Erro ao buscar vídeos do filme');
                }
                const data = await response.json();
    
                // Verifica se há resultados
                if (data.results && data.results.length > 0) {
                    // Filtra os vídeos que têm "trailer" no título
                    const filteredVideos = data.results.filter(video => video.name.toLowerCase().includes('trailer'));
                    
                    // Salva apenas o primeiro vídeo filtrado no estado
                    if (filteredVideos.length > 0) {
                        setVideos([filteredVideos[0]]);
                    } else {
                        // Se não houver trailers, salva todos os vídeos
                        setVideos(data.results);
                    }
                } else {
                    // Se não houver vídeos, define o estado como vazio
                    setVideos([]);
                }
    
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchVideos();
    }, [id]);
    

    if (!videos || videos.length === 0) {
        return <div>Nenhum trailer disponível.</div>;
    }

    return (
        <div>
            <h1>Trailers do Filme</h1>
            <div>
                {videos.map(video => (
                    <div key={video.id}>
                        <iframe
                            width="560"
                            height="315"
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
