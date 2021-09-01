const passport = require('passport');
const local = require('./local');
const { User } = require('../models')

module.exports = () => {
    passport.serializeUser((user, done) => {
        // back/routes/user.js의 req.login(user)의 user가 들어감
        done(null, user.id);
        // done(server error, success);
        // 쿠키랑 묶어줄 id를 저장
    });

    passport.deserializeUser(async (id, done) => {
        // id를 통해서 db에서 user data 가져옴
        try {
            const user = await User.findOne({ where: { id } });
            done(null, user); // req.user 안에 넣음
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();
}