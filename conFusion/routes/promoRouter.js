//Assigment 1: Task 2
//Assigment 2: Task 1 
const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate')

const mongoose = require('mongoose');

const Promos = require('../models/promos');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get((req, res, next) => {
        Promos.find({})
            .then((Promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promos);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Promos.create(req.body)
            .then((Promo) => {
                console.log('Promo Created ', Promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Promos');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Promos.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promos.findById(req.params.promoId)
            .then((Promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Promos/' + req.params.promoId);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Promos.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then((Promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Promos.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
module.exports = promoRouter;