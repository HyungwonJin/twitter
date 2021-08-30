module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { // MySQL네믐 Image 테이블 생성
        // MySQL에서 만들어주는 기본 id가 있다.
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
}