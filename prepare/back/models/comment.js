module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { // MySQL Comment 테이블 생성
        // MySQL에서 만들어주는 기본 id가 있다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // UserId: 1,
        // PostId: 3,
    }, {
        charset: 'utf8mb4', // mb4는 이모티콘
        collate: 'utf8mb4_general_ci', // 한글 저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
}