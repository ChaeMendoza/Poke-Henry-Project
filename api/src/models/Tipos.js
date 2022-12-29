const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tipos', {
        name: {
            type: DataTypes.STRING,
        }
    })
}