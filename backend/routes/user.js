const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const { Op } = require('sequelize');
const { User, Post, Comment, Image, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');


// 로그인 상태 유지
router.get('/', async (req, res, next) => {
    console.log(req.headers);
    try{
        if(req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: { 
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
        
            return res.status(200).json(fullUserWithoutPassword);
        } else {
            return res.status(200).json(null);
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
})


// 특정 유저의 게시글들 가져오기
router.get('/:userId/posts', async (req, res, next) => {
    // console.log('posts get');
    const where = {UserId: req.params.userId};
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


//로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.error(err);
            next(err)
        }
        if(info) {
            return res.status(401).send(info.reason)
        }

        return req.login(user, async (loginErr) => {
            if(loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }

            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: { 
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                }, {
                    model: User,
                    as: 'Followings',
                }, {
                    model: User,
                    as: 'Followers',
                }]
            })

            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req, res, next)
});

// 회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => {
    try {

        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        })

        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('ok');

    } catch (error) {
        console.error(error);
        next(error);
    }
});



//로그아웃
router.post('/logout',isLoggedIn ,(req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send('logout ok');
})


// 닉네임 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {

    try {
        await User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id }
        });

        return res.status(200).json({nickname: req.body.nickname});
    } catch (error) {
        console.error(error);
        next(error)
    }
});


router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.params.userId}});
        if(!user) {
            return res.status(403).send('없는 사람을 팔로우하려고 하시네요?')
        }
        await user.addFollowers(req.user.id);
        return res.status(200).json({UserId: parseInt(req.params.userId, 10)})
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:userId/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.params.userId}});
        if(!user) {
            return res.status(403).send('없는 사람을 언팔로우하려고 하시네요?');
        }

        await user.removeFollowers(req.user.id)
        return res.status(200).json({UserId: parseInt(req.params.userId, 10)});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
    try {

        const user = await User.findOne({where: {id: req.user.id}});
        if(!user) {
            return res.status(403).send('팔로워즈를 불러오는데 실패 했습니다.')
        }
        const followers = await user.getFollowers({
            limit: parseInt(req.query.limit, 10),
        });
        return res.status(200).json(followers);

    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.get('/followings', isLoggedIn, async (req, res, next) => {
    try {

        const user = await User.findOne({where: {id: req.user.id}});
        if(!user) {
            return res.status(403).send('팔로윙즈를 불러오는데 실패했습니다.');
        }
        const followings = await user.getFollowings({
            limit: parseInt(req.query.limit, 10),
        });
        return res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.userId}});

        if(!user) {
            res.status(403).send('없는 사람을 차단하려고 하시네요');
        }

        await user.removeFollowings(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId, 10)});

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 특정 user 가져오기
router.get('/:userId', async (req, res, next) => {
    try {
        const fullUserWithoutPassword = await User.findOne({
            where: {id: req.params.userId},
            attributes: {
                exclude:['password']
            },
            include: [{
                model: Post,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        });
        if(fullUserWithoutPassword) {
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length;
            data.Followers = data.Followers.length;
            data.Followings = data.Followings.length;
            return res.status(200).json(data)
        } else {
            return res.status(404).send('존재하지 않는 사용자입니다.');
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;