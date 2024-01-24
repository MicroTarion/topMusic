import {search,detailsMusic} from "../services/deezerService.js";
import musicRepo from "../repository/MusicRepository.js"

export function admin (req, res){
    res.render('admin');
}
export function searchMusic(req, res) {
    if(req.query.q !== undefined && req.query.q != "") {
        search(req.query.q).then(musics => {  
            res.render('admin/search', {q:req.query.q,musics })
        });
    }
    else {
        res.render('admin/search');
    }
}


export function details(req, res) { 
    if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
        detailsMusic(req.params.id).then(music => {
            res.render('admin/music', {music});
        })
    } else {
        res.redirect('admin/search')
    }   
}

export function saveInBddMusic(req, res) {
    let musicToAdd = new musicRepo();
    if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
        detailsMusic(req.params.id).then(music => {
            musicToAdd.deezerId = music.id
            musicToAdd.title = music.title
            musicToAdd.artist = music.artist.name
            musicToAdd.album = music.album.name
            musicToAdd.image = music.album.cover
            musicToAdd.save();
            req.flash("notify", `La musique a bien été enregistré !`)
            res.render('admin/music', {music});
        })
    } else {
        res.redirect('admin/search')
    }   
}