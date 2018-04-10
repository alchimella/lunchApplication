let assert = require('assert');
let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let bodyParser = require('body-parser');
let router = express.Router();

let url = 'mongodb://localhost:27017/lunchAppDB';

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/insert', (req, res, next) => {
    let item = {
        address: req.body.address
    };

    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('places').insertOne(item, (err, result) => {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    res.redirect('/');
});

module.exports = router;