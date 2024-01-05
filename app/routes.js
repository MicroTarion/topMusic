import homeController from '../src/controllers/HomeController.js';
import * as adminController from '../src/controllers/AdminController.js';

export default (app) => {
   

  

    app.get('/', homeController);

    
    app.get('/search', adminController.searchMusic)
    app.get('/search/music/:id', adminController.saveMovie)
    app.post('/search/movie/:id', adminController.saveInBddMovie)
};