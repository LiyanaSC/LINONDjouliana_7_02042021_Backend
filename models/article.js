'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Article extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Article.hasMany(models.Comment);
            models.Article.belongsTo(models.User, {
                foreignKey: {
                    allowfalse: true
                }
            })

        }
    };
    Article.init({
        publicationDate: DataTypes.DATE,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        imageUrl: DataTypes.STRING
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Article',
    });
    return Article;
};