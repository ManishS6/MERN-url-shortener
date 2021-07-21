const UrlController = require('../controllers/url.controller');
const {authJwt} = require('../middlewares')
module.exports = function(app) {
    // implemented
    app.post('/new',[authJwt.verifyToken],UrlController.newUrl)
    // implementing
    app.get('/all',[authJwt.verifyToken],UrlController.allUrls)
    app.get('/:shorturl',UrlController.getUrl)
}