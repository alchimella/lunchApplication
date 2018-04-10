let assert = require('assert');
let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let router = express.Router();

let url = 'mongodb://localhost:27017/';

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/get-data', (req, res, next) => {
    let resultArray = [];
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        let cursor = db.collection('places').findOne();
        cursor.forEach((doc, err) => {
            assert.equal(null, err);
            resultArray.push(doc);
        }, () => {
            db.close();
            res.render('index', { items: resultArray });
        });
    });
});

router.post('/insert', (req, res, next) => {

    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        let item = {
            address: req.body.address
        };

        let dbo = db.db("lunchAppDB");

        dbo.collection('places').insertOne(item, (err, result) => {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    res.redirect('/');
});

router.post('/update', (req, res, next) => {
    let item = {
        address: req.body.address
    };
    let id = req.body.id;

    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('places').updateOne({ "_id": ObjectId(id) }, { $set: item }, (err, result) => {
            assert.equal(null, err);
            console.log('Item updated');
            db.close();
        });
    });
});

router.post('/delete', (req, res, next) => {
    let id = req.body.id;

    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('places').deleteOne({ "_id": ObjectId(id) }, (err, result) => {
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });
});

module.exports = router;