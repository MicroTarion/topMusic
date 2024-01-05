import fetch from 'node-fetch';


import 'dotenv/config';


import axios from 'axios';

  export async function search(keyword){
    const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: {q: keyword},
        headers: {
          'X-RapidAPI-Key': '647bc92398msh3c5a2a809b4827fp106f71jsn22d39ed2dbde',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        
        return response.data;
    } catch (error) {
        console.error(error);
    }
}




export function details(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    };

    return fetch(url, options)
        .then(responseHttp => responseHttp.json())
        .then((json) => { 
            return {
                tmdb_id: json.id, 
                vote_average: json.vote_average, 
                release_date: json.release_date,
                title: json.title, 
                poster_path: json.poster_path,
                backdrop_path: json.backdrop_path,
                genres: json.genres,
                overview: json.overview,
                tagline: json.tagline
            } 
        })
        .catch(err => console.error('error:' + err));
}
export function detailsMax(id){
    const promises = [];
    
    const url = 'https://api.themoviedb.org/3/movie/'+id;
    const urlcast = 'https://api.themoviedb.org/3/movie/'+id+'/credits';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    };

    
    promises[promises.length] = fetch(url, options)
        .then(res => res.json())
        //.then(json => json.results.map(movie => { return {vote_average: movie.vote_average, release_date: movie.release_date, title: movie.title, poster_path: movie.poster_path,overview: movie.overview } }))
        .catch(err => console.error('error:' + err));
 
    promises[promises.length] = fetch(urlcast, options)
        .then(res => res.json())
        .then(json => json.cast.filter((cast) => cast.known_for_department=='Acting' && cast.order<=10))
        .catch(err => console.error('error:' + err));
    // promises[promises.length] = fetch(urlcast, options)
    // .then(res => res.json())
    // .then(json => json.cast.filter((cast) => cast.known_for_department=='' ))
    
    Promise.all(promises).then((values) => {
        console.log(values[1])
        return {movie:values[0],cast:values[1]}
    })
}
