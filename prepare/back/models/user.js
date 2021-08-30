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
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
        // through는 중간 테이블의 이름을 바꾸는 것, as로 db 유저에 대한 이름 변경, foreignKey는 column의 이름을 지정
    };
    return User;
}