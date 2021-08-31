const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
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

module.exports = router;