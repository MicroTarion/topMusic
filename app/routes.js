import homeController from '../src/controllers/HomeController.js';
import * as musicController from '../src/controllers/AdminController.js';
import * as registerController from '../src/controllers/RegisterController.js';
import * as authController from '../src/controllers/AuthController.js';
import {userExists, controlJWT} from '../src/services/jwtService.js';

export default (app) => {
    // Middleware pour vérifier la connexion 
    app.use('/', userExists);

    /**
     * Gérer le JWT pour toutes les urls commencant par /admin
     */
    app.use('/admin', controlJWT);

    app.get('/', homeController);

    app.get('/register', registerController.registerIndex)
    app.post('/register', registerController.registerProcess)

    app.get('/auth',authController.get)
    app.post('/auth',authController.post)
    app.get('/logout',authController.disconnect)

    app.get('/admin',musicController.admin)
    app.get('/admin/search', musicController.searchMusic)
    app.post('/admin/search', musicController.saveInBddMusic)
    app.get('/admin/music/:id', musicController.details)
    app.post('/admin/music/:id', musicController.saveInBddMusic)
    
    // Search pour tlm
    // app.get('/search', musicController.searchMusic)
    // app.get('/music/:id', musicController.details)
    
};