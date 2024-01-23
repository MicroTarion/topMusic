import userRepo from '../repository/UserRepository.js'

    export function registerIndex (request, response) {
        response.render('register');
    }

    export function registerProcess (request, response) {
        let hashedPassword;
        let user = new userRepo();
        user.firstname = request.body.firstname;
        user.lastname = request.body.lastname;
        user.email = request.body.email;
        user.password = request.body.password;
        console.log(user);
        user.save()
        request.flash('notify', `Votre compte a bien été créé !`)
        response.redirect('/');
    }
        
        // hashedPassword=bcrypt
        // .genSalt(saltRounds)
        // .then(salt => {
        //     // console.log('Salt: ', salt)
        //     return bcrypt.hashSync(request.body.password, salt)
        // }).then((hash) => {
        //     entity.setEmail(request.body.email)
        //     .setPassword(hash)
            

        //     const UserRepo = new UserRepository();
        //     UserRepo.existsEmail(entity.getEmail()).then(emailexists => {
        //         // console.log(emailexists);
        //         if(emailexists) {
        //             // on renvoi le formulaire avec une erreur
        //             console.log('Erreur, le mail est déjà utilisé ');
        //             response.render('register/index',{error:"Erreur, le mail est déjà utilisé" });
        //         } else {
        //             // On enregistre en BDD
        //             UserRepo.add(entity);
        //             request.flash('notify', 'Votre compte a bien été créé.');
        //             response.redirect('/');
        //         }
        //     })
        //     .catch(err => console.error(err.message));
        // })
    