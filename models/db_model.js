const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(process.env.postgres_connect);
const url = sequelize.define('urls', {
    code:{
        type: Sequelize.STRING,
        primaryKey: true
    },
    redirectTo:{
        type: Sequelize.STRING
    }
    },
    {
        timestamps:false
    }
    
)
module.exports = {url}