const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../models');

const router = express.Router();

router.post('/login', (req, res, next) => { // 미들웨어 확장
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
            return res.json(user);
        })
    })(req, res, next);
});

router.post('/', async (req, res, next) => { // POST /user/
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

router.post('/user/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
})

module.exports = router;