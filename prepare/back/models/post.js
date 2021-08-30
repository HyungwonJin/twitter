module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { // MySQL Post 테이블 생성
        // MySQL에서 만들어주는 기본 id가 있다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', // mb4는 이모티콘
        collate: 'utf8bm4_general_ci', // 한글 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
        db.Post.belongsTo(db.Post, { as: 'Retweet' });
    };
    return Post;
}