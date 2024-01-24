import fetch from 'node-fetch';
import 'dotenv/config';
import axios from 'axios';

  export async function search(keyword){
    const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: {q: keyword},
        headers: {
            'X-RapidAPI-Key': process.env.RapidAPIKey,
            'X-RapidAPI-Host': process.env.RapidAPIHost
        }
      };
      try {
        const response = await axios.request(options);
       // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}




export async function detailsMusic(id) {
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/track/'+id,
      headers: {
        'X-RapidAPI-Key': process.env.RapidAPIKey,
        'X-RapidAPI-Host': process.env.RapidAPIHost
      }
    };
    
    try {
        const response = await axios.request(options);
       // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }

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
