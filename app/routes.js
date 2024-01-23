import homeController from '../src/controllers/HomeController.js';
import * as adminController from '../src/controllers/AdminController.js';
import * as registerController from '../src/controllers/RegisterController.js';

export default (app) => {
   
    app.get('/', homeController);

    app.get('/register', registerController.registerIndex)
    app.post('/register', registerController.registerProcess)


    app.get('/search', adminController.searchMusic)
    app.get('/music/:id', adminController.details)
    app.post('/music/:id', adminController.saveInBddMusic)
};