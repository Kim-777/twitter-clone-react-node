const express = require('express');
const { Hashtag, Image, User, Comment, Post } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');


router.get('/:hashtag', async (req, res, next) => {
    // console.log('posts get');
    const where = {};
    try {

        if(parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        }

        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [{
                model: Hashtag,
                where: {
                    name: decodeURIComponent(req.params.hashtag)
                }
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User, // 좋아요 누른사람,
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Post,
                as: 'Retweet',
                include:[{
                    model: User,
                    attributes: ['id', 'nickname']
                }, {
                    model: Image,
                }]
            }]
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }

});


module.exports = router;
