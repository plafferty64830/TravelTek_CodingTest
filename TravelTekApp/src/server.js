var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var mongo = require("mongoose");

var dbConnectStr = "mongodb+srv://plafferty:Polopolo1@cluster0.ksqru.gcp.mongodb.net/flightDB?retryWrites=true&w=majority";

/* connect to db and log out status to console */
var db = mongo.connect(dbConnectStr, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to FlightDB");
    }
});

var app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

var Schema = mongo.Schema;

/* schema for the flightData */
var FlightSchema = new Schema({
    id: { type: String },
    depair: { type: String },
    destair: { type: String },
    indepartcode: { type: String },
    inarrivecode: { type: String },
    outflightno: { type: String },
    outdepartdate: { type: String },
    outdeparttime: { type: String },
    outarrivaldate: { type: String },
    outarrivaltime: { type: String },
    outbookingclass: { type: String },
    outflightclass: { type: String },
    outcarriercode: { type: String },
    inflightno: { type: String },
    indepartdate: { type: String },
    indeparttime: { type: String },
    inarrivaldate: { type: String },
    inarrivaltime: { type: String },
    inbookingclass: { type: String },
    inflightclass: { type: String },
    incarriercode: { type: String },
    originalprice: { type: String },
    originalcurrency: { type: String },
    reservation: { type: String },
    carrier: { type: String },
    oneway: { type: String }
}, { versionKey: false });

/* schema for the segment data */
var SegmentSchema = new Schema({
    flightid: { type: String },
    depcode: { type: String },
    arrcode: { type: String },
    depdate: { type: String },
    arrdate: { type: String },
    deptime: { type: String },
    arrtime: { type: String },
    depterminal: { type: String },
    arrterminal: { type: String },
    flightno: { type: String },
    journey: { type: String },
    class: { type: String },
    bookingclass: { type: String }
}, { versionKey: false });

/* scheme for the IATA Codes */
var iataSchema = new Schema({
    name: { type: String },
    code: { type: String }
}, { versionKey: false });

/* scheme for the airline img names */
var aLineSchema = new Schema({
    name: { type: String },
    imgName: { type: String }
}, { versionKey: false });


var flightModel = mongo.model('flights', FlightSchema, 'flights');

/* get flight data */
app.get("/api/getFlights", function(req, res) {
    flightModel.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    }).limit(parseInt(req.query.max));
});

/* search flights */
app.get("/api/searchFlight", function(req, res) {
    console.log(req.query);
    flightModel.find({ depair: req.query.dep, destair: req.query.arr }, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

var segmentModel = mongo.model('segments', SegmentSchema, 'segments');

/* get segment data */
app.get("/api/getSegments", function(req, res) {
    segmentModel.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

var iataModel = mongo.model('iata', iataSchema, 'iata')

/* get all IATA codes with attributed airports */
app.get("/api/getIata", function(req, res) {
    iataModel.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

var aLineModel = mongo.model('airlines', aLineSchema, 'airlines')

/* get all Airline img names so airline logos can be pulled from the assets/img folder automatically */
app.get("/api/getAirlineImg", function(req, res) {
    aLineModel.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.listen(8000, function() {
    console.log("FlightDB Server Listening on port 8000.....");
});