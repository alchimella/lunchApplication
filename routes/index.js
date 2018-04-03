let express = require('express');
let router = express.Router();
let mongo = require('mongodb').MongoClient;
let objectId = require('mongodb').ObjectID;
let assert = require('assert');

let url = 'mongodb://mongodb://localhost:27017/lunchAppDB';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/read-data', function(req, res, next) {
    let resultArray = [];
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        let cursor = db.collection('places').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('index', { items: resultArray });
        });
    });
});

router.post('/create', function(req, res, next) {
    let item = {
        address: req.body.address
    };

    mongo.connect(url, function (err, db) {
       assert.equal(null, err);
       db.collection('places').insertOne(item, function (err, res) {
           assert.equal(null, err);
           console.log("Item inserted");
           db.close();
       });
    });
    res.redirect('/');
});

router.post('/update-data', function(req, res, next) {
    let item = {
        address: req.body.address
    };

    let id = req.body.id;

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('places').updateOne({ "_id": objectId(id) }, { $set: item }, function (err, res) {
            assert.equal(null, err);
            console.log('Item updated');
            db.close();
        });
    });
});

router.post('/delete-data', function(req, res, next) {
    let id = req.body.id;

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('places').deleteOne({ "_id": objectId(id) }, function (err, res) {
            assert.equal(null, err);
            console.log("Item deleted");
            db.close();
        });
    });
});

module.exports = router;
