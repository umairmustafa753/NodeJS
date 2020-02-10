const express = require('express');
const { check } = require('express-validator');
const { getPost, createPost } = require('../controller/post')
const { expressPostValidator } = require('../validator');
const router = express.Router();


router.get("/", getPost);
router.post(
    "/Post", 
    //For title err
    check('title').notEmpty().withMessage('Write a title'),
    check('title').isLength({ min: 4, max: 150 }).withMessage('Title must be of 4 or 150 character'),
    //For Body err
    check('body').notEmpty().withMessage('Write a Body'),
    check('body').isLength({ min: 4, max: 150 }).withMessage('Body must be of 4 or 150 character'),
    expressPostValidator, 
    createPost
);

module.exports = router;

