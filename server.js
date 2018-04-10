/* Server.js -- Config */

// Variables
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var Bear        = require('./app/models/bear');
var bodyParser  = require('body-parser');

/* -- Connexion avec Mlab (MongoDB) -- */
mongoose.connect('mongodb://zkf:zkfpass@ds241489.mlab.com:41489/api-resful');

/* -- Configuration de Body Parser -- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* -- Configuration du port -- */
var port = process.env.PORT || 8080;

/* -- Configuration des Routes -- */
var router = express.Router();

router.use(function (req, res, next) {
    next();
});

router.route('/bears')
    // Poster (post - localhost:8080/api/bears)
    .post(function (req, res) {
        var bear = new Bear();
        bear.name = req.body.name;

        bear.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear créé !' });
        });
    })
    // Récupérer (get - localhost:8080/api/bears)
    .get(function (req, res) {
        Bear.find(function (err, bears) {
            if (err)
                res.send(err);
            
            res.json(bears);
        })
    });

router.route('/bears/:bear_id')
    // Récupérer (get - localhost:8080/api/bears/bear_id)
    .get(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    // Modifier (put - localhost:8080/api/bears/bear_id)
    .put(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err)
                res.send(err);
            
            bear.name = req.body.name; // Mise à jour du nom

            bear.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear mise à jour !' });
            });
        });
    })
    // Supprimer (delete - localhost:8080/api/bears/bear_id)
    .delete(function (req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function (err, bear) {
            if (err)
                res.send(err);
            
            res.json({ message: 'Suppression correctement efféctuée. '});
        });
    });


// Route de test
router.get('/', function(req, res) {
    res.json({ message: 'route de test !' });
});

// Toute les routes commencent avec le prefix '/api'
app.use('/api', router);

/* -- Configuration du démarrage serveur -- */
app.listen(port);
console.log('Serveur : ' + port);