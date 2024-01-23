import {search,detailsMax,detailsMusic} from "../services/deezerService.js";


export function searchMusic(req, res) {
    if(req.query.q !== undefined && req.query.q != "") {
        search(req.query.q).then(musics => {  
            res.render('search', {q:req.query.q,musics })
        });
    }
    else {
        res.render('search');
    }
}


export function details(req, res) { 
    if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
        detailsMusic(req.params.id).then(music => {
            res.render('music', {music});
        })
    } else {
        res.redirect('/search')
    }   
}

export function saveInBddMusic(req, res) {
    req.flash("notify", `La musique a bien été enregistré !`)
    res.redirect('/search');
    // if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
    //     detailsMusic(req.params.id).then(movie => {
    //         console.log(movie)
    //         addMovie({
    //             tmdb_id: movie.tmdb_id, 
    //             title: movie.title, 
    //             year: movie.release_date,
    //             synopsis: movie.overview,
    //             note: movie.vote_average, 
    //             picture: movie.poster_path,
    //             user_id: req.user_id
    //             });
    //         req.flash("notify", `Le film a bien été enregistré !`)
    //         res.redirect('/admin/movie/'+req.params.id)
    //     })
    // } else {
    //     res.redirect('/music')
    // }   
}