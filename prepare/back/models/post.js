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
    Post.associate = (db) => { };
    return Post;
}