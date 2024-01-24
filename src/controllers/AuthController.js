import bcrypt from 'bcryptjs';
import userRepo from '../repository/UserRepository.js'
import jwt  from 'jsonwebtoken';
import Cookies from "cookies";



export function get(req, res) {
    res.render('auth');
}

export async function post(req, res) {
    let error;
    const query = userRepo.where({ email: req.body.email });
    query.findOne().then((user) => {
        if(user !== null) {
            console.log("user non nul");
            if(bcrypt.compareSync(req.body.password, user.password)) {
                 let accessToken = jwt.sign({email: user.email}, process.env.SECRET_JWT, {expiresIn: 604800});                   
                 new Cookies(req,res).set('jwt', accessToken, {httpOnly: true, secure: (process.env.APP_ENV === 'production') });

                req.flash('notify', 'Vous êtes maintenant connecté');
                return res.redirect('/');
            } else {
                error = `Echec d'identification.`
            }
        } else {
            error = `Auncun compte n'existe avec cet identifiant.`
        }
        res.render('auth', { error });
    })
}

export function disconnect(req, res) {
    new Cookies(req,res).set('jwt',"", {maxAge: Date.now()});
    req.flash('notify', 'Vous êtes maintenant déconnecté');
    return res.redirect('/');
}