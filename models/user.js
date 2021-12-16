const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
            },
            highScore: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            verifyToken: {
                type: DataTypes.STRING,
                defaultValue: null,
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            defaultScope: {
                attributes: {exclude: ['password', 'verifyToken', 'isAdmin']},
            },
            scopes: {
                withSecretColumns: {
                    attributes: {include: ['password', 'verifyToken', 'isAdmin']},
                },
            },
        },
    );
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};