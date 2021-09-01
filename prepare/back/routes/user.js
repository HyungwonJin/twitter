const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require("../routes/middlewares");

const router = express.Router();

router.post('/login', isNotLoggedIn, (req, res, next) => { // 미들웨어 확장
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(error);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
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
            return res.status(200).json(fullUserWithoutPassword); // action.data로 넘어감 reducer의 me가 됨
        })
    })(req, res, next);
});

router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
    const { email, nickname, password } = req.body;
    try {
        const exUser = await User.findOne({
            where: {
                email,
            }
        });
        if (exUser) {
            return res.status(403).send('이미 사용중인 이메일 입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email,
            nickname,
            password: hashedPassword,
        });
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
})

module.exports = router;