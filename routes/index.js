let assert = require('assert');
let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let router = express.Router();

let url = 'mongodb://localhost:27017/lunchAppDB';

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/get-data', (err, res, next) => {
    let resultArray = [];
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        let cursor = db.collection('lunchAppDB').find();
        cursor.forEach((doc, err) => {
           assert.equal(null, err);
           resultArray.push(doc);
        }, () => {
            db.close();
            res.render('index', { items: resultArray });
        });
    });
});

router.post('/index', (req, res, next) => {
    let item = {
        address: req.body.address
    };

    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('lunchAppDB').insertOne(item, (err, res) => {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    res.redirect('/');
});
module.exports = router;