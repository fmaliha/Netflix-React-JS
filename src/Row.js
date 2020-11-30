import React, {useState, useEffect} from 'react';
import axios from "./axios";
import "./Row.scss";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { Component } from "react";


const base_URL = "https://image.tmdb.org/t/p/original/";

    function Row({title, fetchURL, isLargeRow}) {

        const [movies, setMovies] = useState([]);
        const [trailerUrl, setTrailerUrl] = useState("");
       

        //  a snippet off code which runs based on a specific condition
    useEffect(() => {
    //if [blank], run once wheen the row loads, and dont run again 
        async function fetchData(){
            const request = await axios.get(fetchURL);
            //axios.get(fetchURL) does => https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
            console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);
    

    const opts = {
        height: "390",
        width: "100%",
        
        playerVars:{
            autoplay:1,
        },
        
    };

    
    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl('');
        }else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name|| "" )
            .then(url => {

                //https://www.youtube.com/watch?v=Xjbansjnbj
                //will search trailer and take the key part after v
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));

            }).catch((error) => console.log(error));
        }

    };



    console.log(movies);

        return (
            <div className="row">
                {/* //title */}
                <h2 className="row_title">{title}</h2>
               

                {/* container => posters */}
            
                    <div className="row_posters">
                      
                       
                            {movies.map(movie => (
                            <img 
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                
                                src={`${base_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                            ))}


                       
                       
                    </div>
                        
                       
                

                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}

                
            </div>
        )
    }


export default Row
 