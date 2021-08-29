module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySQL user 테이블 생성
        // MySQL에서 만들어주는 기본 id가 있다.
        email: {
            type: DataTypes.STRING(30),
            allowNull: false, // false이면 필수
            uniqe: true,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    User.associate = (db) => { };
    return User;
}